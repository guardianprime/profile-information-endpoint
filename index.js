import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({ message: "hng has started" });
});

app.get("/me", async (req, res) => {
  async function getCatData() {
    try {
      const response = await fetch("https://catfact.ninja/fact");
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  }

  const catFact = await getCatData();

  res.json({
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
