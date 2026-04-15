function setYear() {
    const yearSpan = document.querySelector("#year");
    if (yearSpan) {
        yearSpan.textContent = `${new Date().getFullYear()}`;
    }
}

function setActiveNav() {
    const path = window.location.pathname.toLowerCase();
    const links = document.querySelectorAll(".site-nav a[data-nav]");

    links.forEach((a) => {
        const href = (a.getAttribute("href") ?? "").toLowerCase();
        const isCurrent = path.endsWith(href);
        if (isCurrent) {
            a.setAttribute("aria-current", "page");
        }
    });
}

function setupMenu() {
    const btn = document.querySelector("#menuBtn");
    const nav = document.querySelector("#siteNav");

    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        btn.setAttribute("aria-expanded", `${isOpen}`);
    });

    nav.addEventListener("click", (e) => {
        const target = e.target;
        if (target instanceof HTMLAnchorElement) {
            nav.classList.remove("open");
            btn.setAttribute("aria-expanded", "false");
        }
    });
}

setYear();
setActiveNav();
setupMenu();