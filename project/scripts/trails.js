const TRAILS = [
    {
        id: "battle-creek",
        name: "Battle Creek Falls ",
        distanceMi: 1.6,
        timeHr: 1.5,
        elevationFt: 600,
        difficulty: "Easy",
        dogFriendly: true,
        season: "Spring",
        image: "images/battle-creek-600.webp",
        alt: "Waterfall on a hiking trail"
    },
    {
        id: "grove-creek",
        name: "Grove Creek",
        distanceMi: 3.2,
        timeHr: 2.0,
        elevationFt: 900,
        difficulty: "Moderate",
        dogFriendly: true,
        season: "Fall",
        image: "images/overlook.webp",
        alt: "Trail through trees in autumn"
    },
    {
        id: "dry-canyon",
        name: "Dry Canyon Overlook ",
        distanceMi: 2.8,
        timeHr: 2.0,
        elevationFt: 800,
        difficulty: "Moderate",
        dogFriendly: false,
        season: "Summer",
        image: "images/overlook.webp",
        alt: "Overlook with mountains in the distance"
    },
    {
        id: "rock-canyon",
        name: "Rock Canyon",
        distanceMi: 2.5,
        timeHr: 1.8,
        elevationFt: 700,
        difficulty: "Easy",
        dogFriendly: true,
        season: "Spring",
        image: "images/Canyon.webp",
        alt: "Canyon trail with rocky walls"
    }
];

const KEY_FAVORITES = "trailnest-favorites";

function getFavorites() {
    return JSON.parse(localStorage.getItem(KEY_FAVORITES)) ?? [];
}

function setFavorites(favs) {
    localStorage.setItem(KEY_FAVORITES, JSON.stringify(favs));
}

function getFilterState() {
    const difficulty = document.querySelector("#difficulty").value;
    const maxTime = document.querySelector("#maxTime").value;
    const season = document.querySelector("#season").value;
    const dogOnly = document.querySelector("#dogOnly").checked;
    const sortBy = document.querySelector("#sortBy").value;

    return { difficulty, maxTime, season, dogOnly, sortBy };
}

function applyFilters() {
    const { difficulty, maxTime, season, dogOnly, sortBy } = getFilterState();

    let results = [...TRAILS];

    results = results.filter((t) => (difficulty === "all" ? true : t.difficulty === difficulty));
    results = results.filter((t) => (season === "all" ? true : t.season === season));
    results = results.filter((t) => (dogOnly ? t.dogFriendly === true : true));
    results = results.filter((t) => (maxTime === "all" ? true : t.timeHr <= Number(maxTime)));

    results.sort((a, b) => {
        if (sortBy === "time") return a.timeHr - b.timeHr;
        if (sortBy === "distance") return a.distanceMi - b.distanceMi;
        return a.name.localeCompare(b.name);
    });

    renderTrails(results);
    renderMeta(results);
}

function renderMeta(results) {
    const resultsMsg = document.querySelector("#resultsMsg");
    const favoritesMsg = document.querySelector("#favoritesMsg");
    const favs = getFavorites();

    if (resultsMsg) {
        resultsMsg.textContent = results.length === 0
            ? `No trails match your filters.`
            : `Showing ${results.length} trail(s).`;
    }

    if (favoritesMsg) {
        favoritesMsg.textContent = favs.length === 0
            ? `Favorites: none yet.`
            : `Favorites saved: ${favs.length}.`;
    }
}

function toggleFavorite(id) {
    const favs = getFavorites();
    const updated = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id];
    setFavorites(updated);
    applyFilters();
}

function renderTrails(list) {
    const container = document.querySelector("#trailCards");
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = ``;
        return;
    }

    const favs = getFavorites();

    container.innerHTML = list.map((t) => `
    <article class="card trail-card">
      <img src="${t.image}" alt="${t.alt}" loading="lazy" width="900" height="600">
      <h3>${t.name}</h3>
      <p><strong>Distance:</strong> ${t.distanceMi} mi • <strong>Time:</strong> ${t.timeHr} hr</p>
      <p><strong>Difficulty:</strong> ${t.difficulty} • <strong>Elevation:</strong> ${t.elevationFt} ft</p>
      <p><strong>Dogs:</strong> ${t.dogFriendly ? `Allowed` : `Not allowed`} • <strong>Best season:</strong> ${t.season}</p>

      <div class="card-actions">
        <button class="fav-btn ${favs.includes(t.id) ? `is-fav` : ``}" type="button" data-id="${t.id}">
          ${favs.includes(t.id) ? `★ Favorited` : `☆ Save favorite`}
        </button>
      </div>
    </article>
  `).join(``);

    container.querySelectorAll(".fav-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            toggleFavorite(btn.dataset.id);
        });
    });
}

function clearFilters() {
    document.querySelector("#difficulty").value = "all";
    document.querySelector("#maxTime").value = "all";
    document.querySelector("#season").value = "all";
    document.querySelector("#dogOnly").checked = false;
    document.querySelector("#sortBy").value = "name";
    applyFilters();
}

function initTrails() {
    const controls = ["#difficulty", "#maxTime", "#season", "#dogOnly", "#sortBy"];
    controls.forEach((sel) => {
        const el = document.querySelector(sel);
        if (el) {
            el.addEventListener("change", () => applyFilters());
        }
    });

    const clearBtn = document.querySelector("#clearFilters");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => clearFilters());
    }

    applyFilters();
}

initTrails();