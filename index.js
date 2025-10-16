import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Too many requests. Please try again later." },
});

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const catApiUrl = process.env.CAT_API_URL || "https://catfact.ninja/fact";

app.use(cors());
app.use(limiter);

async function getCatData() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

  try {
    const response = await fetch(catApiUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      console.error(`Cat API Error: ${response.status}`);
      return { success: false, fact: "Could not fetch cat fact (API error)" };
    }

    const data = await response.json();
    return { success: true, fact: data.fact };
  } catch (error) {
    clearTimeout(timeout);
    if (error.name === "AbortError") {
      console.error("Cat API request timed out");
      return { success: false, fact: "Request timed out fetching cat fact" };
    }
    console.error("Cat API fetch error:", error.message);
    return { success: false, fact: "Could not fetch cat fact (network error)" };
  }
}

app.get("/", (req, res) => {
  res.send({ message: "This is a " });
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
      email: "okongordian",
      name: "gordian okon",
      stack: "Nodejs",
    },
    timestamp: new Date().toISOString(),
    fact: catFact.fact,
  });
});

app.listen(PORT, () => {
  console.log(`server is running on cool temp!! @ ${PORT} `);
});
