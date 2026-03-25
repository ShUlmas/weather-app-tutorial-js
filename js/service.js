import { BASE_URL, API_KEY } from "./constants.js";

export async function getWeather(query) {
    const response = await fetch(
        `${BASE_URL}forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=no`
    );

    if (!response.ok) {
        throw new Error("API error: " + response.status);
    }

    const data = await response.json();
    return data;
}