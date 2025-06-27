const apiKey = "CREATE YOUR OWN API KEY ";

const searchBtn = document.querySelector(".search-btn");
const locationBtn = document.querySelector(".location-btn");
const cityInput = document.querySelector(".city-input");

const cityNameElem = document.querySelector(".city-name");
const detailsElem = document.querySelector(".details");
const weatherIconElem = document.querySelector(".weather-icon");
const weatherCardsContainer = document.querySelector(".weather-cards");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  fetchWeather(city);
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        alert("Location access denied.");
      }
    );
  } else {
    alert("Geolocation not supported.");
  }
});

async function fetchWeather(city) {
  try {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl)
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error("City not found");
    }

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    updateCurrentWeather(currentData);
    updateForecast(forecastData.list);
  } catch (error) {
    alert(error.message);
  }
}

async function fetchWeatherByCoords(lat, lon) {
  try {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl)
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    updateCurrentWeather(currentData);
    updateForecast(forecastData.list);
  } catch (error) {
    alert("Failed to retrieve location-based weather");
  }
}

function updateCurrentWeather(data) {
  const date = new Date().toLocaleDateString();
  cityNameElem.textContent = `${data.name} (${date})`;

  detailsElem.innerHTML = `
    <h6>Temperature: ${data.main.temp}°C</h6>
    <h6>Wind: ${data.wind.speed} m/s</h6>
    <h6>Humidity: ${data.main.humidity}%</h6>
  `;

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  weatherIconElem.src = iconUrl;
  weatherIconElem.alt = data.weather[0].description;
}

function updateForecast(forecastList) {
  const dailyForecasts = forecastList.filter(forecast =>
    forecast.dt_txt.includes("12:00:00")
  );
  weatherCardsContainer.innerHTML = "";

  dailyForecasts.forEach(forecast => {
    const date = new Date(forecast.dt_txt).toLocaleDateString();
    const temp = forecast.main.temp;
    const wind = forecast.wind.speed;
    const humidity = forecast.main.humidity;
    const iconCode = forecast.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const card = `
      <li class="card">
        <h3>${date}</h3>
        <img class="forecast-icon" src="${iconUrl}" alt="${forecast.weather[0].description}" />
        <h6>Temp: ${temp}°C</h6>
        <h6>Wind: ${wind} m/s</h6>
        <h6>Humidity: ${humidity}%</h6>
      </li>
    `;

    weatherCardsContainer.insertAdjacentHTML("beforeend", card);
  });
}
