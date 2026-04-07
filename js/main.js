import { getWeather } from "./service.js";
import {
    renderCurrentWeatherUI,
    renderAstroUI,
    renderHourlyWeatherUI,
    renderWeeklyWeatherUI,
    renderAirQualityUI
} from "./ui.js";

// GET USER LOCATION AND FETCH WEATHER
navigator.geolocation.getCurrentPosition(
    async (position) => {
        const { latitude, longitude } = position.coords;

        const weather = await getWeather(`${latitude},${longitude}`);

        renderCurrentWeatherUI(weather);
        renderAstroUI(weather)
        renderHourlyWeatherUI(weather);
        renderWeeklyWeatherUI(weather);
        renderAirQualityUI(weather);
    },
    async () => {
        // fallback
        const weather = await getWeather("Tashkent");
        renderCurrentWeatherUI(weather);
    }
);

// SEARCH FUNCTIONALITY
async function search() {
    const query = searchInput.value.trim();
    if (query) {
        try {
            const weather = await getWeather(query);
            renderCurrentWeatherUI(weather);
            renderAstroUI(weather)
            renderHourlyWeatherUI(weather);
            renderWeeklyWeatherUI(weather);
            renderAirQualityUI(weather);
        } catch (error) {
            alert("City not found. Please try again.");
        }
    }
    searchInput.value = "";
}
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");

searchBtn.addEventListener("click", async () => {
    search();
});

searchInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
        search();
    }
})