
const products = [
    { id: "p100", name: "HydroFlow Water Filter" },
    { id: "p101", name: "SummitTrail Hiking Boots" },
    { id: "p102", name: "SolarSpark Power Bank" },
    { id: "p103", name: "BreezePro Camping Fan" },
    { id: "p104", name: "ThermaShield Rain Jacket" }
];

document.addEventListener("DOMContentLoaded", () => {
   
    const storageKey = "reviewCount";
    const current = Number(localStorage.getItem(storageKey)) || 0;
    const updated = current + 1;
    localStorage.setItem(storageKey, String(updated));

    const countEl = document.querySelector("#reviewCount");
    if (countEl) countEl.textContent = updated;

  
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product");
    const rating = params.get("rating");
    const installDate = params.get("installDate");

    const productName =
        products.find(p => p.id === productId)?.name ?? (productId ?? "—");

    const sumProduct = document.querySelector("#sumProduct");
    const sumRating = document.querySelector("#sumRating");
    const sumDate = document.querySelector("#sumDate");

    if (sumProduct) sumProduct.textContent = productName;
    if (sumRating) sumRating.textContent = rating ? `${rating}/5` : "—";
    if (sumDate) sumDate.textContent = installDate ?? "—";
});