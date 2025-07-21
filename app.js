const express = require("express");
const axios = require("axios");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./db");
const Weather = require("./model/weather");

connectDB(); 
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/weather", async (req, res) => {
  const city = req.body.city;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const weather = result.data;

    // Save to MongoDB
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

    await weatherData.save();

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
    res.status(500).send("Internal Server Error");
  }
});

app.get("/weather/all", async (req, res) => {
  const apiKey = process.env.WEATHER_API_KEY;
const cities = [
  "London", "Paris", "Berlin", "Rome", "Madrid", "Amsterdam", "Warsaw", "Vienna",
  "Lisbon", "Athens", "Zurich", "Brussels", "Prague", "Budapest", "Dublin",
  "Oslo", "Stockholm", "Copenhagen", "Helsinki", "Barcelona", "Milan",
  "Munich", "Frankfurt", "Hamburg", "Cologne", "Lyon", "Nice", "Edinburgh",
  "Krakow", "Bucharest", "Sofia", "Geneva", "Bratislava", "Luxembourg", "Vilnius",
  "Riga", "Tallinn", "Belgrade", "Zagreb", "Sarajevo", "Skopje", "Podgorica",
  "Ljubljana", "Valletta", "Reykjavik", "Tirana", "Chisinau", "Monaco", "Andorra la Vella", "San Marino"
];


  try {
    const weatherData = await Promise.all(
      cities.map(async (city) => {
        const result = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const weather = result.data;
        return {
          country: weather.sys.country,
          city: weather.name,
          temperature: weather.main.temp,
          condition: weather.weather[0].description,
          humidity: weather.main.humidity,
          windSpeed: weather.wind.speed,
          visibility: weather.visibility,
          cloudiness: weather.clouds.all,
          pressure: weather.main.pressure,
        };
      })
    );

    res.render("all-weather", { weatherData });
  } catch (err) {
    console.error(err);
    res.status(500).send("🔃Reload");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
