# Weather Forecasting Application

## Introduction
A lightweight and responsive web application that provides real-time weather information and a 5-day forecast using the OpenWeatherMap API. Designed for users to quickly check weather conditions based on city input or current location, with an intuitive UI and dynamic weather icons.

## Project Overview
The Weather Forecasting Application is built using HTML, CSS, and JavaScript. It allows users to search for weather updates by entering a city name or using their device's location. The application fetches data from the OpenWeatherMap API and dynamically displays current weather (temperature, humidity, wind speed) along with a 5-day forecast. It includes error handling for invalid input and location denial.

## Key Features
- Search weather by city name
- Use current location (via browser's Geolocation API)
- View current temperature, humidity, and wind speed
- 5-day weather forecast with weather condition icons
- Error handling for invalid input or location denial
- Responsive layout for desktop and mobile devices

## Technologies Used
- **HTML5** – Page structure and layout
- **CSS3** – Styling and responsiveness
- **JavaScript (Vanilla JS)** – Logic, event handling, and API interaction
- **OpenWeatherMap API** – Weather data source

## Working Principle
1. The user inputs a city or allows location access.
2. JavaScript sends a `fetch()` request to the OpenWeatherMap API.
3. The response is parsed and weather data is extracted.
4. Weather details and forecast are displayed using DOM manipulation.
5. Weather icons are shown using icon codes from the API.

## APIs and Tools
- [OpenWeatherMap API](https://openweathermap.org/api)
- Geolocation API (from the browser)
- Fetch API with `async/await`

## Project Structure
weather-app/
│
├── index.html # Main structure of the application

├── style.css # Styling and responsive layout

├── script.js # JavaScript logic and weather API integration

└── README.md # Project documentation

## Error Handling
- Alerts for empty input or invalid city name
- Notification if location access is denied
- Catches and displays errors for failed API responses

## Future Enhancements
- Add hourly weather forecast
- Include UV index and air quality data
- Toggle for Celsius/Fahrenheit
- Save favorite cities
- Add dark mode

## Contributor
**U.Sai Harshitha**

## Feel free to reach out for any questions or collaboration opportunities!






