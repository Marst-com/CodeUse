import {
    getProjectKey,
    languages
} from "./languages.js";

export function loadCode(language) {
    try {
        return localStorage.getItem(
            getProjectKey(language)
        ) ?? languages[language].starter;
    } catch {
        return languages[language].starter;
    }
}

export function saveCode(language, code) {
    try {
        localStorage.setItem(
            getProjectKey(language),
            code
        );
    } catch (error) {
        console.warn("S.EUS save error:", error);
    }
}
