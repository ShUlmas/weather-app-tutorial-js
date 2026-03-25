const locationSpan = document.querySelector("#locationText");
const tempSpan = document.querySelector("#tempC");
const conditionP = document.querySelector("#conditionText");
const highLowTempP = document.querySelector("#highLowTemp");
const humidityP = document.querySelector("#humidity");
const windP = document.querySelector("#wind");
const pressureP = document.querySelector("#pressure");
const visibilityP = document.querySelector("#visibility");
const conditionImg = document.querySelector("#conditionIcon");

export function renderCurrentWeatherUI(data) {
    locationSpan.textContent = data.location;
    tempSpan.textContent = data.tempC + "°";
    conditionP.textContent = data.condition;
    highLowTempP.textContent = data.highLowT;
    humidityP.textContent = data.humidity + "%";
    windP.textContent = data.wind + " km/h";
    pressureP.textContent = data.pressure + " mb";
    visibilityP.textContent = data.visibility + " km";
    conditionImg.src = data.icon;
}