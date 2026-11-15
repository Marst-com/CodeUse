import "./styles/main.css";

import { renderHome } from "./ui/home.js";
import { renderStudio } from "./ui/studio.js";

const app = document.querySelector("#app");

function route() {
    const path = window.location.pathname
        .replace(/\/+$/, "") || "/";

    if (path === "/html") {
        renderStudio(app, "html");
    } else if (path === "/css") {
        renderStudio(app, "css");
    } else if (path === "/js") {
        renderStudio(app, "js");
    } else {
        renderHome(app);
    }
}

window.addEventListener("popstate", route);

document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-link]");

    if (!link) return;

    event.preventDefault();

    const href = link.getAttribute("href");

    history.pushState({}, "", href);

    route();
});

route();
