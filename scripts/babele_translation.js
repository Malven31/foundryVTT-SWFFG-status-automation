const MODULE_ID = "star-wars-status-automation";

export function init() {
    if (typeof Babele !== "undefined") {
        Babele.get().register({
            module: MODULE_ID,
            lang: "en",
            dir: "compendium/en",
        });
        Babele.get().register({
            module: MODULE_ID,
            lang: "fr",
            dir: "compendium/fr",
        });
    }
}
