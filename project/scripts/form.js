console.log("form.js loaded");
const products = [
    { id: "p100", name: "HydroFlow Water Filter" },
    { id: "p101", name: "SummitTrail Hiking Boots" },
    { id: "p102", name: "SolarSpark Power Bank" },
    { id: "p103", name: "BreezePro Camping Fan" },
    { id: "p104", name: "ThermaShield Rain Jacket" }
];

document.addEventListener("DOMContentLoaded", () => {
    const select = document.querySelector("#product");

    products.forEach((p) => {
        const opt = document.createElement("option");
        opt.value = p.id;         // value (id)
        opt.textContent = p.name; // text shown to user (name)
        select.appendChild(opt);
    });
});