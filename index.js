const apiKey =  "73c0e91f0a48e1b418f8041e395a304a"

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event)=>{
    event.preventDefault(); // It prevent refreshing of the page

    const cityValue = cityInputEl.value;
    console.log(cityValue)

    getWeatherData(cityValue)

})


async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if (!response.ok) {
            throw new error("Network response was on ok!")
        }

        const data = await response.json()
        console.log(data);
        
        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description;

        const icon= data.weather[0].icon

        const details = [
            `Feels Like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`

        ]

        weatherDataEl.querySelector(".icon").innerHTML  = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt= Weather icon">`

        weatherDataEl.querySelector(".temperature").innerHTML = `${temperature}°C`;

        weatherDataEl.querySelector(".description").innerHTML = `${description}`;

        weatherDataEl.querySelector(".details").innerHTML= details.map((detail)=>`<div>${detail}</div>`).join("");

    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML  = ""

        weatherDataEl.querySelector(".temperature").innerHTML = "";

        weatherDataEl.querySelector(".description").innerHTML = "An error happened, please try again later";

        weatherDataEl.querySelector(".details").innerHTML= "";

    }
}