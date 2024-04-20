const apiKey = "8e3ee8eaf9a9d681f60e34c53a77de20";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".Weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".Weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Handling weather icon based on weather condition
        const weatherMain = data.weather[0].main.toLowerCase(); // Ensure consistent comparison

        switch (weatherMain) {
    case "clouds":
        weatherIcon.src = "images/clouds.png";
        break;
    case "rain":
        weatherIcon.src = "images/rain.png";
        break;
    case "clear":
        weatherIcon.src = "images/clear.png";
        break;
    case "drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
    case "snow":
        weatherIcon.src = "images/snow.png";
        break;
    case "mist":
        weatherIcon.src = "images/mist.png";
        break;
}


        document.querySelector(".Weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}
      

searchBtn.addEventListener("click", () => {
    const cityName = searchBox.value.trim(); // Trim whitespace from input
    if (cityName) {
        checkWeather(cityName);
    } else {
        // Display an error message for empty city name input
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error p").innerHTML = "Please enter a city name.";
        document.querySelector(".Weather").style.display = "none";
    }
});
