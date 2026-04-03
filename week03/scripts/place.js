const temperature = 10;
const windspeed = 5;

function calculateWindChill(temp, speed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
}

let windChill = "N/A";

if (temperature <= 10 && windspeed > 4.8) {
    windChill = calculateWindChill(temperature, windspeed).toFixed(1) + " °C";
}

document.getElementById("windchill").textContent = windChill;

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = document.lastModified;