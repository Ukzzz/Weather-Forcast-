# Weather Forecast | Premium 🌦️

A modern, high-performance weather forecasting application built with Node.js, Express, and EJS. Featuring a stunning glassmorphism design and optimized service architecture.

## 🚀 Features

- **Real-time Weather**: Get accurate atmospheric data for any city worldwide using the OpenWeather API.
- **European Regional Hubs**: A dedicated dashboard monitoring weather conditions across 50+ major cities.
- **Premium UI**: Sophisticated glassmorphism aesthetic with micro-animations and responsive layouts.
- **Intelligent Caching**: Optimized dashboard performance with smart data TTL management.
- **Clean Architecture**: Modular service layer and decoupled configuration for high maintainability.

## 🛠️ Technology Stack

- **Backend**: Node.js, Express
- **Frontend**: EJS, Tailwind CSS, Vanilla CSS (Premium Glassmorphism)
- **Database**: MongoDB (Mongoose)
- **API**: OpenWeather API

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your credentials:
   ```properties
   WEATHER_API_KEY=your_openweather_api_key
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```text
├── config/             # Configuration files (cities list)
├── model/              # Mongoose schemas
├── public/             # Static assets (CSS, images)
├── services/           # Business logic and API services
├── views/              # EJS templates
│   └── partials/       # Reusable UI components
├── app.js              # Application entry point
├── db.js               # Database connection logic
└── .env                # Environment variables
```

## 📄 License
ISC
