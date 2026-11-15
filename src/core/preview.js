import { composeDocument } from "./compiler.js";

export function updatePreview(frame, language, code) {
    frame.srcdoc = composeDocument(language, code);
}
