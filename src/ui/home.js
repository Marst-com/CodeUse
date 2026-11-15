import { languages } from "../core/languages.js";

export function renderHome(app) {
    app.innerHTML = `
        <div class="home-shell">

            <nav class="topbar">
                <a class="brand" href="/" data-link>
                    <span class="brand-mark">S</span>
                    <span>S.EUS</span>
                </a>

                <span class="nav-note">
                    WEB CODE STUDIO
                    <span class="status-dot"></span>
                </span>
            </nav>

            <main class="hero">

                <div class="eyebrow">
                    <span class="eyebrow-line"></span>
                    YOUR CODE. YOUR SPACE.
                </div>

                <h1>
                    아이디어를 코드로,<br>
                    <span class="accent">바로 실행하세요.</span>
                </h1>

                <p class="hero-copy">
                    S.EUS는 HTML, CSS, JavaScript를 브라우저에서
                    작성하고 즉시 실행할 수 있는 웹 코드 스튜디오입니다.
                </p>

                <div class="language-grid">

                    ${Object.entries(languages).map(([key, lang]) => `
                        <a class="language-card"
                           href="/${key}"
                           data-link>

                            <div class="language-icon ${key}">
                                ${lang.icon}
                            </div>

                            <div class="language-meta">
                                <h2>${lang.title}</h2>
                                <p>${lang.description}</p>
                            </div>

                            <span class="card-arrow">↗</span>
                        </a>
                    `).join("")}

                </div>

                <div class="hero-foot">
                    ✦ 자동 미리보기 · 브라우저 실행 · 코드 저장
                </div>

            </main>

            <footer class="footer">
                <span>S.EUS <b>v0.1.0</b></span>
                <span>IDEAS → CODE → RESULTS</span>
            </footer>

        </div>
    `;
}
