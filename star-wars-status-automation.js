import { encumbrance_sync } from "./scripts/encumbrance_automation.js";
import { init as settings_init } from "./scripts/settings.js";

Hooks.once("init", () => {
    settings_init();
});

Hooks.on("updateActor", (...args) => {
    encumbrance_sync("updateActor", ...args);
});

Hooks.on("updateItem", (...args) => {
    encumbrance_sync("updateItem", ...args);
});

Hooks.on("createItem", (...args) => {
    encumbrance_sync("updateItem", ...args);
});

Hooks.on("deleteItem", (...args) => {
    encumbrance_sync("updateItem", ...args);
});

Hooks.on("canvasReady", (...args) => {
    encumbrance_sync("scene", ...args);
});
