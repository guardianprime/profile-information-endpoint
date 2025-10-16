import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import axios from "axios";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Too many requests. Please try again later." },
});

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const catApiUrl = process.env.CAT_API_URL || "https://catfact.ninja/fact";
const userName = process.env.user_name || "gordian okon";
const userEmail = process.env.user_email || "okongordian@gmail.com";
const userStack = process.env.user_stack || "nodejs";

app.use(cors());
app.use(limiter);

async function getCatData() {
  try {
    const response = await axios.get(catApiUrl, { timeout: 5000 });

    return { success: true, fact: response.data.fact };
  } catch (error) {
    // Handle different error types
    if (error.code === "ECONNABORTED") {
      console.error("Cat API request timed out");
      return { success: false, fact: "Request timed out fetching cat fact" };
    }

    if (error.response) {
      console.error(`Cat API Error: ${error.response.status}`);
      return { success: false, fact: "Could not fetch cat fact (API error)" };
    } else if (error.request) {
      console.error("No response received from Cat API");
      return { success: false, fact: "No response from cat fact server" };
    } else {
      console.error("Cat API fetch error:", error.message);
      return {
        success: false,
        fact: "Could not fetch cat fact (network error)",
      };
    }
  }
}

app.get("/", (req, res) => {
  res.send({
    message:
      "This is a hng project task, use the /me endpoint to access user information and cat facts",
  });
});

app.get("/me", async (req, res) => {
  const catFact = await getCatData();
  console.log(catFact);

  if (!catFact.success) {
    return res.status(502).json({
      status: "error",
      message: catFact.fact,
      timestamp: new Date().toISOString(),
    });
  }

  res.status(200).json({
    status: "success",
    user: {
      email: userEmail,
      name: userName,
      stack: userStack,
    },
    timestamp: new Date().toISOString(),
    fact: catFact.fact,
  });
});

app.listen(PORT, () => {
  console.log(`server is running on cool temp!! @ ${PORT}`);
});
