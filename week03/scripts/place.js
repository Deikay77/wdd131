// REQUIRED: function named calculateWindChill with ONE LINE return (Metric formula)
function calculateWindChill(tempC, windKmh) {
    return Math.round((13.12 + 0.6215 * tempC - 11.37 * (windKmh ** 0.16) + 0.3965 * tempC * (windKmh ** 0.16)) * 10) / 10;
}

document.addEventListener("DOMContentLoaded", () => {
    // Footer: year + last modified
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    // Static displayed values (must match the HTML values)
    const temp = Number(document.getElementById("temperature").textContent);
    const wind = Number(document.getElementById("windspeed").textContent);
    const output = document.getElementById("windchill");

    // REQUIRED: Only call calculateWindChill if conditions are met
    // Metric viability: temp <= 10°C and wind > 4.8 km/h
    if (temp <= 10 && wind > 4.8) {
        output.textContent = `${calculateWindChill(temp, wind)} °C`;
    } else {
        output.textContent = "N/A";
    }
});