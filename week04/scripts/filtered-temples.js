const temples = [

    {
        name: "Salt Lake Temple",
        location: "Salt Lake City, Utah, USA",
        dedicated: "1893",
        area: 253000,
        imageUrl: "images/saltlake.webp"
    },

    {
        name: "Rome Italy Temple",
        location: "Rome, Italy",
        dedicated: "2019",
        area: 41000,
        imageUrl: "images/rome.jpg"
    },

    {
        name: "Paris France Temple",
        location: "Paris, France",
        dedicated: "2017",
        area: 44000,
        imageUrl: "images/paris.webp"
    },

    {
        name: "Tokyo Japan Temple",
        location: "Tokyo, Japan",
        dedicated: "1980",
        area: 52900,
        imageUrl: "images/tokyo.webp"
    },

    {
        name: "Mexico City Mexico Temple",
        location: "Mexico City, Mexico",
        dedicated: "1983",
        area: 116000,
        imageUrl: "images/mexico.webp"
    },

    {
        name: "London England Temple",
        location: "London, England",
        dedicated: "1958",
        area: 42652,
        imageUrl: "images/london.webp"
    },

    {
        name: "Accra Ghana Temple",
        location: "Accra, Ghana",
        dedicated: "2004",
        area: 17500,
        imageUrl: "images/accra.webp"
    },

    {
        name: "Johannesburg South Africa Temple",
        location: "Johannesburg, South Africa",
        dedicated: "1985",
        area: 19184,
        imageUrl: "images/johanesburg.webp"
    },

    {
        name: "Manila Philippines Temple",
        location: "Manila, Philippines",
        dedicated: "1984",
        area: 26683,
        imageUrl: "images/manila.webp"
    }

];

const gallery = document.querySelector("#gallery");

function displayTemples(templeList) {

    gallery.innerHTML = "";

    templeList.forEach(temple => {

        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = temple.imageUrl;
        img.alt = temple.name;
        img.loading = "lazy";

        const caption = document.createElement("figcaption");
        caption.textContent = temple.name;

        const location = document.createElement("p");
        location.textContent = `Location: ${temple.location}`;

        const dedicated = document.createElement("p");
        dedicated.textContent = `Dedicated: ${temple.dedicated}`;

        const area = document.createElement("p");
        area.textContent = `Area: ${temple.area.toLocaleString()} sq ft`;

        figure.appendChild(img);
        figure.appendChild(caption);
        figure.appendChild(location);
        figure.appendChild(dedicated);
        figure.appendChild(area);

        gallery.appendChild(figure);

    });

}

displayTemples(temples);

/* Navigation Filters */

document.querySelector("#home").addEventListener("click", () => {
    displayTemples(temples);
});

document.querySelector("#old").addEventListener("click", () => {
    const oldTemples = temples.filter(t => parseInt(t.dedicated) < 1900);
    displayTemples(oldTemples);
});

document.querySelector("#new").addEventListener("click", () => {
    const newTemples = temples.filter(t => parseInt(t.dedicated) > 2000);
    displayTemples(newTemples);
});

document.querySelector("#large").addEventListener("click", () => {
    const largeTemples = temples.filter(t => t.area > 90000);
    displayTemples(largeTemples);
});

document.querySelector("#small").addEventListener("click", () => {
    const smallTemples = temples.filter(t => t.area < 10000);
    displayTemples(smallTemples);
});

/* Footer */

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;