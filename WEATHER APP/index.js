document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "8646626bb720c80cadc0fb170abf5d72";
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";
    const searchBox = document.querySelector(".searchcity");
    const searchBtn = document.querySelector(".search");
    const weatherIcon = document.querySelector(".weather-icon");

    if (!searchBtn || !searchBox) {
        console.error("Search button or input element not found!");
        return;
    }

    searchBtn.addEventListener("click", () => {
        const city = searchBox.value.trim();
        if (city === "") {
            console.error("City input is empty!");
            return;
        }
        fetchWeather(city);
    });

    async function fetchWeather(city) {
        try {
            const response = await fetch(`${apiURL}&q=${city}&appid=${apiKey}`);
            if (!response.ok) {
                if (response.status === 404) {
                    showError(true);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            updateWeatherData(data);
        } catch (error) {
            console.error("Error fetching the weather data:", error);
            showError(true);
        }
    }

    function updateWeatherData(data) {
        document.querySelector(".outputcity").textContent = data.name;
        document.querySelector(".tempe").textContent = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".humid").textContent = `${data.main.humidity}%`;
        document.querySelector(".wind").textContent = `${data.wind.speed} Km/h`;

        const weatherCondition = data.weather[0].main;
        const iconMap = {
            Clouds: "./Assets/clouds.png",
            Clear: "./Assets/clear.png",
            Rain: "./Assets/rain.png",
            Drizzle: "./Assets/drizzle.png",
            Mist: "./Assets/mist.png"
        };
        weatherIcon.src = iconMap[weatherCondition] || "./Assets/clouds.png";

        showError(false);
    }

    function showError(show) {
        document.querySelector(".error").style.visibility = show ? "visible" : "hidden";
        document.querySelector(".submain").style.visibility = show ? "hidden" : "visible";
    }
});
