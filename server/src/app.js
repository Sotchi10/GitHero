const express = require("express");
const logger = require("./middleware/logger");

const app = express();

// middleware
app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GitHero Backend is running");
});

module.exports = app;
