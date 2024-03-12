// Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
const apiKey = '0825b3d02496a29f794d483e4f0d1737';

function getWeather() {
    const cityInput = document.getElementById('cityInput').value;

    if (cityInput.trim() === '') {
        alert('Please enter a city.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found. Please try again.');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const cityName = data.name;
    const countryName = data.sys.country;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    // Get icon URL based on weather code
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const content = `
        <h2>${cityName}, ${countryName}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Description: ${weatherDescription}</p>
        <img src="${iconUrl}" alt="Weather Icon">
    `;

    weatherInfo.innerHTML = content;
}

// Call the function to get weather data
getWeather();
