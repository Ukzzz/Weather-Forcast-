const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  country: String,
  city: String,
  temperature: Number,
  condition: String,
  humidity: Number,
  windSpeed: Number,
  visibility: Number,
  cloudiness: Number,
  pressure: Number,
  sunrise: Date,
  sunset: Date,
});

const Weather = mongoose.model("Weather", weatherSchema);

module.exports = Weather;
