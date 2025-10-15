import express from "express";
import dotenv from "dotenv";
import { timeStamp } from "console";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({ message: "hng has started" });
});

app.get("/me", (req, res) => {
  res.send({
    status: "success",
    user: {
      email: "okongordian",
      name: "gordian okon",
      stack: "Nodejs",
    },
    timestamp: "current utc time in iso 8601 format",
    fact: "random cat fact from cat facts API",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on cool temp!! @ ${PORT} `);
});
