import { getWeather } from "./service.js";
import { formatWeatherData } from "./utils.js";
import { renderCurrentWeatherUI } from "./ui.js";

navigator.geolocation.getCurrentPosition(
    async (position) => {
        const { latitude, longitude } = position.coords;

        const weather = await getWeather(`${latitude},${longitude}`);
        const formatted = formatWeatherData(weather);

        renderCurrentWeatherUI(formatted);
    },
    async () => {
        // fallback
        const weather = await getWeather("Tashkent");
        const formatted = formatWeatherData(weather);

        renderCurrentWeatherUI(formatted);
    }
);