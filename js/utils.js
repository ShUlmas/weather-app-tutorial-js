export function formatWeatherData(weather) {
    const day = weather.forecast.forecastday[0].day;

    return {
        location: `${weather.location.name}, ${weather.location.country}`,
        tempC: Math.round(weather.current.temp_c),
        condition: weather.current.condition.text,
        highLowT: `H: ${Math.round(day.maxtemp_c)}° L: ${Math.round(day.mintemp_c)}°`,
        humidity: weather.current.humidity,
        wind: Math.round(weather.current.wind_kph),
        pressure: weather.current.pressure_mb,
        visibility: weather.current.vis_km,
        icon: "https:" + weather.current.condition.icon
    };
}