# Weather Forecast Application

A full-stack web application that provides real-time weather information for cities around the world. The application fetches weather data from the OpenWeatherMap API and stores the search history in a MongoDB database.

## Features

- Real-time weather information for any city worldwide
- Detailed weather metrics including:
  - Current temperature
  - Weather conditions
  - Humidity
  - Wind speed
  - Visibility
  - Cloudiness
  - Atmospheric pressure
  - Sunrise and sunset times
- Search history stored in MongoDB
- Responsive and user-friendly interface

## Technologies Used

- **Frontend**:
  - HTML5, CSS3
  - EJS (Embedded JavaScript) templating
  - JavaScript (ES6+)

- **Backend**:
  - Node.js
  - Express.js
  - Axios for API requests

- **Database**:
  - MongoDB with Mongoose ODM

- **APIs**:
  - OpenWeatherMap API

## Prerequisites

Before running this project, you'll need:

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account or local MongoDB instance
- OpenWeatherMap API key (free tier available)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd MiniProj#2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   WEATHER_API_KEY=your_openweathermap_api_key
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
MiniProj#2/
├── .env                  # Environment variables
├── .gitignore           # Git ignore file
├── app.js               # Main application file
├── db.js                # Database connection setup
├── package.json         # Project dependencies
├── README.md            # Project documentation
├── model/
│   └── weather.js       # Mongoose schema and model
└── views/
    ├── all-weather.ejs  # View for all weather searches
    ├── index.ejs        # Homepage view
    └── result.ejs       # Weather results view
```

## API Endpoints

- `GET /` - Homepage with weather search form
- `POST /weather` - Fetch and display weather for a specific city
- `GET /weather/all` - View all previous weather searches

## Environment Variables

- `WEATHER_API_KEY` - Your OpenWeatherMap API key
- `MONGODB_URI` - MongoDB connection string

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
