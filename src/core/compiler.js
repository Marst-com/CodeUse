import { languages } from "./languages.js";

export function composeDocument(language, source) {
    if (language === "html") {
        const code = source || languages.html.starter;

        if (/<html[\s>]/i.test(code)) {
            return code;
        }

        return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    ${code}
</body>
</html>`;
    }

    if (language === "css") {
        return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        ${source}
    </style>
</head>
<body>
    <div class="card">
        <h1>S.EUS CSS Preview</h1>
        <p>작성한 CSS 스타일이 적용됩니다.</p>
    </div>
</body>
</html>`;
    }

    const escaped = source.replace(/<\/script/gi, "<\\/script");

    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        body {
            margin: 0;
            font-family: system-ui, sans-serif;
            color: #1b2717;
            background: #f4f7f0;
        }
    </style>

    <script>
        (() => {
            function send(type, args) {
                parent.postMessage({
                    __seus: true,
                    type,
                    args: args.map(value => {
                        try {
                            return typeof value === "string"
                                ? value
                                : JSON.stringify(value);
                        } catch {
                            return String(value);
                        }
                    })
                }, "*");
            }

            console.log = (...args) => send("log", args);
            console.info = (...args) => send("info", args);
            console.warn = (...args) => send("warn", args);
            console.error = (...args) => send("error", args);

            window.addEventListener("error", event => {
                send("error", [
                    event.message +
                    " (" + event.lineno + ":" + event.colno + ")"
                ]);
            });

            window.addEventListener("unhandledrejection", event => {
                send("error", [
                    "Unhandled promise rejection",
                    String(event.reason)
                ]);
            });
        })();
    </script>
</head>

<body>
    <script>
        ${escaped}
    </script>
</body>
</html>`;
}
