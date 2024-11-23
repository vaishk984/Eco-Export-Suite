const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Endpoint for fetching shipping rates
app.post("/getRates", (req, res) => {
  try {
    const rates = JSON.parse(fs.readFileSync("rates.json", "utf8"));
    res.status(200).json(rates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch rates from the file." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
