const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const API_URL = "https://api.waqi.info/feed/";
const API_KEY = process.env.AQI_API_KEY; // API key stored in .env

app.get("/api/airquality/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(`${API_URL}${city}/?token=${API_KEY}`);
    if (response.data.status === "ok") {
      return res.json({ aqi: response.data.data.aqi, city: response.data.data.city.name });
    }
    res.status(404).json({ error: "City not found or API error" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
