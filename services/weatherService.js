const axios = require("axios");

const CACHE_TTL = 60 * 60 * 1000; // 1 hour
let dashboardCache = {
  data: null,
  timestamp: 0,
};

const getWeatherByCity = async (city, apiKey) => {
  const result = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  return result.data;
};

const getEuropeDashboardWeather = async (cities, apiKey) => {
  const now = Date.now();
  if (dashboardCache.data && (now - dashboardCache.timestamp < CACHE_TTL)) {
    console.log("Returning cached dashboard data");
    return dashboardCache.data;
  }

  console.log("Fetching new dashboard data");
  const weatherData = await Promise.all(
    cities.map(async (city) => {
      try {
        const data = await getWeatherByCity(city, apiKey);
        return {
          country: data.sys.country,
          city: data.name,
          temperature: data.main.temp,
          condition: data.weather[0].description,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          visibility: data.visibility,
          cloudiness: data.clouds.all,
          pressure: data.main.pressure,
        };
      } catch (err) {
        console.error(`Error fetching weather for ${city}:`, err.message);
        return null; // Handle individual failures gracefully
      }
    })
  );

  const filteredData = weatherData.filter(d => d !== null);
  
  // Cache the result
  dashboardCache = {
    data: filteredData,
    timestamp: now,
  };

  return filteredData;
};

module.exports = {
  getWeatherByCity,
  getEuropeDashboardWeather,
};
