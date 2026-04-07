// CURRENT WEATHER ELEMENTS
const locationSpan = document.querySelector("#locationText");
const tempSpan = document.querySelector("#tempC");
const conditionP = document.querySelector("#conditionText");
const highLowTempP = document.querySelector("#highLowTemp");
const humidityP = document.querySelector("#humidity");
const windP = document.querySelector("#wind");
const pressureP = document.querySelector("#pressure");
const visibilityP = document.querySelector("#visibility");
const conditionImg = document.querySelector("#conditionIcon");

// SUNRISE SUNSET ELEMENTS
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const moonPhase = document.querySelector("#moonPhase");

// RENDER CURRENT WEATHER
export function renderCurrentWeatherUI(weather) {
    locationSpan.textContent = `📍 ${weather.location.name}, ${weather.location.country}`;
    tempSpan.textContent = `${Math.round(weather.current.temp_c)}°C`;
    conditionP.textContent = weather.current.condition.text;
    highLowTempP.textContent = `H: ${Math.round(weather.forecast.forecastday[0].day.maxtemp_c)}°C / L: ${Math.round(weather.forecast.forecastday[0].day.mintemp_c)}°C`;
    humidityP.textContent = `${weather.current.humidity}%`;
    windP.textContent = `${Math.round(weather.current.wind_kph)} kph`;
    pressureP.textContent = `${weather.current.pressure_mb} mb`;
    visibilityP.textContent = `${weather.current.vis_km} km`;
    conditionImg.src = weather.current.condition.icon;
}
// RENDER ASTRO WEATHER
export function renderAstroUI(weather) {
    sunrise.textContent = `${weather.forecast.forecastday[0].astro.sunrise}`;
    sunset.textContent = `${weather.forecast.forecastday[0].astro.sunset}`;
    moonPhase.textContent = `${weather.forecast.forecastday[0].astro.moon_phase}`;

}
// RENDER HOURLY WEATHER
const hourlyContainer = document.querySelector("#hourlyContainer");
export function renderHourlyWeatherUI(weather) {
    hourlyContainer.innerHTML = ""; // Clear previous content
    // Get current hour to filter hourly data
    const currentHour = new Date().getHours();
    const hourlyData = weather.forecast.forecastday[0].hour;
    const filteredHourlyData = hourlyData.filter(hour => {
        const hourTime = new Date(hour.time).getHours();
        return hourTime >= currentHour; // Show only current and future hours
    });
    const nextDayHourlyData = weather.forecast.forecastday[1].hour;
    const filteredNextDayHourlyData = nextDayHourlyData.filter(hour => {
        const hourTime = new Date(hour.time).getHours();
        return hourTime < currentHour; // Show only past hours of the next day
    });
    const combinedHourlyData = [...filteredHourlyData, ...filteredNextDayHourlyData];

    combinedHourlyData.forEach((hour) => {
        // <div
        //     class="min-w-[110px] rounded-2xl bg-white/5 border border-white/5 p-4 text-center hover:-translate-y-1 transition-all duration-300">
        //     <p class="text-sm text-slate-400">12:00</p>
        //     <img src="https://cdn.weatherapi.com/weather/64x64/day/113.png"
        //         class="w-12 h-12 mx-auto my-3" alt="" />
        //     <p class="text-lg font-semibold">25°</p>
        //     <p class="text-xs text-slate-400 mt-2">10%</p>
        // </div>
        const hourElement = document.createElement("div");
        hourElement.className = "min-w-[110px] rounded-2xl bg-white/5 border border-white/5 p-4 text-center hover:-translate-y-1 transition-all duration-300";

        const timeP = document.createElement("p");
        timeP.className = "text-sm text-slate-400";
        timeP.textContent = hour.time.split(" ")[1].slice(0, 5);

        const conditionImg = document.createElement("img");
        conditionImg.src = hour.condition.icon;
        conditionImg.className = "w-12 h-12 mx-auto my-3";

        const tempP = document.createElement("p");
        tempP.className = "text-lg font-semibold";
        tempP.textContent = `${Math.round(hour.temp_c)}°`;

        const chanceOfRainP = document.createElement("p");
        chanceOfRainP.className = "text-xs text-slate-400 mt-2";
        chanceOfRainP.textContent = `${hour.chance_of_rain}%`;

        hourElement.appendChild(timeP);
        hourElement.appendChild(conditionImg);
        hourElement.appendChild(tempP);
        hourElement.appendChild(chanceOfRainP);

        hourlyContainer.appendChild(hourElement);
    });
}

// RENDER WEEKLY WEATHER
const weeklyContainer = document.querySelector("#weeklyContainer");
export function renderWeeklyWeatherUI(weather) {
    weeklyContainer.innerHTML = ""; // Clear previous content
    // Implementation for weekly weather rendering
    // <div
    //     class="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-4 hover:bg-white/10 transition">
    //     <div class="flex items-center gap-4">
    //         <span class="text-sm text-slate-300 w-20">Monday</span>
    //         <span class="text-2xl">☀️</span>
    //         <span class="text-slate-400 text-sm">Sunny</span>
    //     </div>
    //     <div class="text-right">
    //         <span class="font-semibold">29°</span>
    //         <span class="text-slate-500 ml-2">18°</span>
    //     </div>
    // </div>
    weather.forecast.forecastday.forEach((day) => {
        const dayElement = document.createElement("div");
        dayElement.className = "flex items-center justify-between rounded-2xl bg-white/5 px-4 py-4 hover:bg-white/10 transition";

        const dayInfoDiv = document.createElement("div");
        dayInfoDiv.className = "flex items-center gap-4";

        const dayNameSpan = document.createElement("span");
        dayNameSpan.className = "text-md text-slate-300 w-20";
        const date = new Date(day.date);
        const options = { weekday: 'long' };
        dayNameSpan.textContent = date.toLocaleDateString(undefined, options);

        const conditionIcon = document.createElement("img");
        conditionIcon.src = day.day.condition.icon;
        conditionIcon.className = "w-12 h-12";

        const conditionTextSpan = document.createElement("span");
        conditionTextSpan.className = "text-slate-400 text-sm";
        conditionTextSpan.textContent = day.day.condition.text;

        dayInfoDiv.appendChild(dayNameSpan);
        dayInfoDiv.appendChild(conditionIcon);
        dayInfoDiv.appendChild(conditionTextSpan);

        const tempDiv = document.createElement("div");
        tempDiv.className = "text-right";

        const maxTempSpan = document.createElement("span");
        maxTempSpan.className = "font-semibold";
        maxTempSpan.textContent = `${Math.round(day.day.maxtemp_c)}°`;

        const minTempSpan = document.createElement("span");
        minTempSpan.className = "text-slate-500 ml-2";
        minTempSpan.textContent = `${Math.round(day.day.mintemp_c)}°`;

        tempDiv.appendChild(maxTempSpan);
        tempDiv.appendChild(minTempSpan);

        dayElement.appendChild(dayInfoDiv);
        dayElement.appendChild(tempDiv);

        weeklyContainer.append(dayElement);
    });
}

// AIR QUALITY WEATHER --- IGNORE ---
export function renderAirQualityUI(weather) {
    //<!-- Air Quality -->
    //<div class="flex items-center justify-between mb-4">
    //    <span class="text-slate-400">AQI</span>
    //    <span class="text-emerald-400 font-semibold">Good</span>
    //</div>
    //<div class="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
    //    <div
    //        class="h-full w-[62%] bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full">
    //     </div>
    //</div>
    //                     

    const aqiContainer = document.querySelector("#aqiContainer");
    aqiContainer.innerHTML = ""; // Clear previous content

    const aqiValue = weather.current.air_quality["us-epa-index"];
    let aqiText = "";
    let aqiColorClass = "";

    switch (aqiValue) {
        case 1:
            aqiText = "Good";
            aqiColorClass = "text-emerald-400";
            break;
        case 2:
            aqiText = "Moderate";
            aqiColorClass = "text-yellow-400";
            break;
        case 3:
            aqiText = "Unhealthy for Sensitive Groups";
            aqiColorClass = "text-orange-400";
            break;
        case 4:
            aqiText = "Unhealthy";
            aqiColorClass = "text-red-400";
            break;
        case 5:
            aqiText = "Very Unhealthy";
            aqiColorClass = "text-purple-400";
            break;
        case 6:
            aqiText = "Hazardous";
            aqiColorClass = "text-gray-400";
            break;
        default:
            aqiText = "Unknown";
            aqiColorClass = "text-slate-400";
    }

    const aqiInfoDiv = document.createElement("div");
    aqiInfoDiv.className = "flex items-center justify-between mb-4";

    const aqiLabelSpan = document.createElement("span");
    aqiLabelSpan.className = "text-slate-400";
    aqiLabelSpan.textContent = "AQI";

    const aqiValueSpan = document.createElement("span");
    aqiValueSpan.className = `${aqiColorClass} font-semibold`;
    aqiValueSpan.textContent = aqiText;

    aqiInfoDiv.appendChild(aqiLabelSpan);
    aqiInfoDiv.appendChild(aqiValueSpan);

    const progressBarContainer = document.createElement("div");
    progressBarContainer.className = "w-full h-3 rounded-full bg-slate-800 overflow-hidden";

    const progressBar = document.createElement("div");
    progressBar.className = `h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full`;
    progressBar.style.width = `${(aqiValue / 6) * 100}%`;

    progressBarContainer.appendChild(progressBar);

    aqiContainer.appendChild(aqiInfoDiv);
    aqiContainer.appendChild(progressBarContainer);
}

export function renderOtherCitiesWeatherUI(weather) {

}