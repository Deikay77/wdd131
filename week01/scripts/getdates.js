// Footer: current year + last modified
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("currentyear");
    const lastMod = document.getElementById("lastModified");

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastMod) lastMod.textContent = `Last Modified: ${document.lastModified}`;
});