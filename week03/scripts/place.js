// Required: function that returns wind chill (one line return), Metric units
function calculateWindChill(tempC, windKmh) {
    return Math.round((13.12 + 0.6215 * tempC - 11.37 * (windKmh ** 0.16) + 0.3965 * tempC * (windKmh ** 0.16)) * 10) / 10;
}

document.addEventListener("DOMContentLoaded", () => {
    // Footer requirements
    document.querySelector("#year").textContent = new Date().getFullYear();
    document.querySelector("#lastModified").textContent = document.lastModified;

    // Static values read from HTML
    const temp = Number(document.querySelector("#temperature").textContent);
    const wind = Number(document.querySelector("#windspeed").textContent);
    const output = document.querySelector("#windchill");

    // Only calculate when valid (Metric): temp <= 10°C and wind > 4.8 km/h
    if (temp <= 10 && wind > 4.8) {
        output.textContent = `${calculateWindChill(temp, wind)} °C`;
    } else {
        output.textContent = "N/A";
    }
});