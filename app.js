const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./db");
const Weather = require("./model/weather");
const weatherService = require("./services/weatherService");
const cities = require("./config/cities.json");

dotenv.config({ path: path.join(__dirname, ".env") });
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/weather", async (req, res) => {
  const { city } = req.body;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return res.status(400).send("City name is required");
  }

  try {
    const weather = await weatherService.getWeatherByCity(city, apiKey);

    // Save to MongoDB asynchronously (don't block the response)
    const weatherData = new Weather({
      country: weather.sys.country,
      city: weather.name,
      temperature: weather.main.temp,
      condition: weather.weather[0].description,
      humidity: weather.main.humidity,
      windSpeed: weather.wind.speed,
      visibility: weather.visibility,
      cloudiness: weather.clouds.all,
      pressure: weather.main.pressure,
      sunrise: new Date(weather.sys.sunrise * 1000),
      sunset: new Date(weather.sys.sunset * 1000),
    });
    weatherData.save().catch(err => console.error("Error saving weather data:", err));

    // Render EJS page
    res.render("result", {
      country: weather.sys.country,
      city: weather.name,
      temp: weather.main.temp,
      cond: weather.weather[0].description,
      icon: weather.weather[0].icon,
      humidity: weather.main.humidity,
      windSpeed: weather.wind.speed,
      visibility: weather.visibility,
      cloudiness: weather.clouds.all,
      pressure: weather.main.pressure,
      sunrise: new Date(weather.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(weather.sys.sunset * 1000).toLocaleTimeString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("index", { error: "Could not fetch weather data. Please try again." });
  }
});

app.get("/weather/all", async (req, res) => {
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const weatherData = await weatherService.getEuropeDashboardWeather(cities, apiKey);
    res.render("all-weather", { weatherData });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading dashboard data.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
