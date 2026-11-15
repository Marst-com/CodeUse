export const languages = {
    html: {
        title: "HTML",
        icon: "</>",
        description: "Markup · Web structure",

        starter: `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>S.EUS HTML</title>
</head>
<body>
    <h1>안녕, S.EUS!</h1>
    <p>HTML 코드를 작성해 보세요.</p>
</body>
</html>`
    },

    css: {
        title: "CSS",
        icon: "✳",
        description: "Stylesheet · Visual design",

        starter: `body {
    font-family: system-ui, sans-serif;
    background: #eef4e8;
    color: #1b2717;

    display: grid;
    place-items: center;

    min-height: 100vh;
}

.card {
    padding: 32px;
    border-radius: 24px;
    background: white;

    box-shadow: 0 12px 40px #24351a18;
}

h1 {
    color: #5b8c35;
}`
    },

    js: {
        title: "JavaScript",
        icon: "JS",
        description: "JavaScript · Logic",

        starter: `console.log("Hello, S.EUS!");

document.body.innerHTML = \`
    <main style="font-family:system-ui;padding:32px">
        <h1>Hello, S.EUS!</h1>
        <p>JavaScript 실행 완료 ✨</p>

        <button id="demo">눌러보기</button>
    </main>
\`;

document.querySelector("#demo").addEventListener("click", () => {
    console.log("버튼을 클릭했어요!");
});`
    }
};

export function getProjectKey(language) {
    return `seus-project-${language}-v1`;
}
