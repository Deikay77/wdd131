document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.querySelector("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const modEl = document.querySelector("#lastModified");
    if (modEl) modEl.textContent = document.lastModified;
});