import { languages } from "../core/languages.js";

import {
    loadCode,
    saveCode
} from "../core/storage.js";

import {
    updatePreview
} from "../core/preview.js";

export function renderStudio(app, language) {
    const lang = languages[language];

    let code = loadCode(language);

    app.innerHTML = `
        <div class="studio-shell">

            <header class="studio-topbar">

                <a class="brand" href="/" data-link>
                    <span class="brand-mark">S</span>
                    <span>S.EUS</span>
                </a>

                <div class="crumb">
                    <span>Playground</span>
                    <span class="crumb-slash">/</span>
                    <b>${lang.title}</b>
                </div>

                <div class="top-actions">
                    <span class="saved-label">
                        <span class="status-dot"></span>
                        Local save
                    </span>

                    <button class="btn btn-primary" id="runBtn">
                        ▶ 실행
                    </button>
                </div>

            </header>

            <section class="studio-heading">

                <div>
                    <div class="eyebrow small">
                        <span class="status-dot"></span>
                        ${lang.description.toUpperCase()}
                    </div>

                    <h1>
                        ${lang.title}
                        <span>Playground</span>
                    </h1>

                    <p>
                        ${lang.subtitle || "코드를 작성하고 바로 실행하세요."}
                    </p>
                </div>

                <div class="heading-actions">
                    <button class="btn btn-ghost" id="resetBtn">
                        ↺ 초기화
                    </button>

                    <button class="btn btn-ghost" id="homeBtn">
                        ⌂ 언어 선택
                    </button>
                </div>

            </section>

            <main class="workbench">

                <section class="panel editor-panel">

                    <div class="panel-bar">

                        <div class="panel-title">
                            <span class="panel-dot"></span>
                            EDITOR

                            <span class="file-name">
                                ${language}.${language}
                            </span>
                        </div>

                        <span class="auto-label">
                            AUTO PREVIEW
                            <span class="status-dot"></span>
                        </span>

                    </div>

                    <div class="editor-wrap">

                        <div class="line-gutter" id="gutter">
                            1
                        </div>

                        <textarea
                            id="editor"
                            spellcheck="false"
                            autocapitalize="off"
                            autocomplete="off"
                            aria-label="${lang.title} code editor"
                        ></textarea>

                    </div>

                    <div class="editor-foot">
                        <span id="lineCount">1 line</span>
                        <span>UTF-8 · ${lang.title}</span>
                    </div>

                </section>

                <section class="panel preview-panel">

                    <div class="panel-bar">

                        <div class="panel-title">
                            <span class="panel-dot preview-dot"></span>
                            LIVE PREVIEW
                        </div>

                        <div class="preview-actions">

                            <span class="live-label">
                                <span class="status-dot"></span>
                                LIVE
                            </span>

                            <button
                                class="icon-btn"
                                id="refreshBtn"
                                title="미리보기 새로고침"
                            >
                                ↻
                            </button>

                        </div>

                    </div>

                    <div class="preview-frame-wrap">
                        <iframe
                            id="preview"
                            title="코드 미리보기"
                            sandbox="allow-scripts"
                        ></iframe>
                    </div>

                    <div class="console-panel">

                        <div class="console-head">
                            <span>CONSOLE</span>

                            <button
                                class="clear-btn"
                                id="clearConsole"
                            >
                                지우기
                            </button>
                        </div>

                        <div
                            class="console-output"
                            id="consoleOutput"
                        >
                            <div class="console-empty">
                                실행 로그가 여기에 표시됩니다.
                            </div>
                        </div>

                    </div>

                </section>

            </main>

            <footer class="studio-footer">
                <span>S.EUS <b>v0.1.0</b></span>
                <span>Changes are saved in this browser</span>
            </footer>

        </div>
    `;

    const editor = app.querySelector("#editor");
    const frame = app.querySelector("#preview");
    const gutter = app.querySelector("#gutter");
    const lineCount = app.querySelector("#lineCount");
    const consoleOutput = app.querySelector("#consoleOutput");

    editor.value = code;

    let compileTimer;

    function updateLineNumbers() {
        const count = editor.value.split("\n").length;

        gutter.textContent = Array.from(
            { length: count },
            (_, i) => i + 1
        ).join("\n");

        lineCount.textContent =
            `${count} ${count === 1 ? "line" : "lines"}`;
    }

    function run() {
        code = editor.value;

        saveCode(language, code);

        consoleOutput.innerHTML = "";

        updatePreview(frame, language, code);
    }

    function addConsole(type, args) {
        const empty = consoleOutput.querySelector(".console-empty");

        if (empty) {
            empty.remove();
        }

        const line = document.createElement("div");

        line.className = `console-line console-${type}`;

        line.textContent = args.join(" ");

        consoleOutput.appendChild(line);

        consoleOutput.scrollTop =
            consoleOutput.scrollHeight;
    }

    editor.addEventListener("input", () => {
        updateLineNumbers();

        saveCode(language, editor.value);

        clearTimeout(compileTimer);

        compileTimer = setTimeout(run, 450);
    });

    editor.addEventListener("scroll", () => {
        gutter.scrollTop = editor.scrollTop;
    });

    app.querySelector("#runBtn").addEventListener("click", run);

    app.querySelector("#refreshBtn").addEventListener("click", run);

    app.querySelector("#resetBtn").addEventListener("click", () => {
        if (!confirm("기본 예제로 초기화할까요?")) {
            return;
        }

        editor.value = lang.starter;

        updateLineNumbers();

        run();
    });

    app.querySelector("#homeBtn").addEventListener("click", () => {
        history.pushState({}, "", "/");

        window.dispatchEvent(
            new PopStateEvent("popstate")
        );
    });

    app.querySelector("#clearConsole").addEventListener("click", () => {
        consoleOutput.innerHTML = `
            <div class="console-empty">
                콘솔을 비웠습니다.
            </div>
        `;
    });

    window.addEventListener("message", (event) => {
        if (event.source !== frame.contentWindow) {
            return;
        }

        if (!event.data?.__seus) {
            return;
        }

        addConsole(
            event.data.type,
            event.data.args || []
        );
    });

    updateLineNumbers();

    run();
}
