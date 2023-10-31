const apiKey = 'cfddb44beaed7456e8c415189e8e280b';

function getWeather() {
    const cityName = document.getElementById('cityInput').value;
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = '';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const curWeather = data.weather[0].main;
            const curTemperature = data.main.temp;
            const curWindSpeed = data.wind.speed;
            const curHumidity = data.main.humidity;
            const curWeatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            const curWeatherCard = document.createElement('div');
            curWeatherCard.classList.add('weather-card', 'current-weather-card');

            const curWeatherIconElement = document.createElement('img');
            curWeatherIconElement.src = curWeatherIcon;
            const curWeatherElement = document.createElement('h2');
            curWeatherElement.textContent = `Current Weather: ${curWeather}`;
            const curTemperatureElement = document.createElement('p');
            curTemperatureElement.textContent = `Current Temperature: ${curTemperature} °C`;
            const curWindElement = document.createElement('p');
            curWindElement.textContent = `Wind Speed: ${curWindSpeed} m/s`;
            const curHumidityElement = document.createElement('p');
            curHumidityElement.textContent = `Humidity: ${curHumidity}%`;
            const curTimeElement = document.createElement('p');
            const curTime = new Date().toLocaleTimeString();
            curTimeElement.textContent = `Local Time: ${curTime}`;

            curWeatherCard.appendChild(curWeatherIconElement);
            curWeatherCard.appendChild(curWeatherElement);
            curWeatherCard.appendChild(curTemperatureElement);
            curWeatherCard.appendChild(curWindElement);
            curWeatherCard.appendChild(curHumidityElement);
            curWeatherCard.appendChild(curTimeElement);

            weatherContainer.appendChild(curWeatherCard);
        })
        .catch(error => console.log('Error fetching current weather data:', error));

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&cnt=5&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const forecasts = data.list;
            forecasts.forEach(forecast => {
                const date = new Date(forecast.dt_txt);
                const temperature = forecast.main.temp;
                const weatherDescription = forecast.weather[0].description;
                const weatherIcon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
                const windSpeed = forecast.wind.speed;
                const humidity = forecast.main.humidity;

                const weatherCard = document.createElement('div');
                weatherCard.classList.add('weather-card');

                const dateElement = document.createElement('h2');
                dateElement.textContent = date.toDateString();
                const tempElement = document.createElement('p');
                tempElement.textContent = `Temperature: ${temperature} °C`;
                const descElement = document.createElement('p');
                descElement.textContent = `Description: ${weatherDescription}`;
                const iconElement = document.createElement('img');
                iconElement.src = weatherIcon;
                const windElement = document.createElement('p');
                windElement.textContent = `Wind Speed: ${windSpeed} m/s`;
                const humidityElement = document.createElement('p');
                humidityElement.textContent = `Humidity: ${humidity}%`;

                weatherCard.appendChild(dateElement);
                weatherCard.appendChild(iconElement);
                weatherCard.appendChild(tempElement);
                weatherCard.appendChild(descElement);
                weatherCard.appendChild(windElement);
                weatherCard.appendChild(humidityElement);

                weatherContainer.appendChild(weatherCard);
            });
        })
        .catch(error => console.log('Error fetching weather forecast data:', error));
}
