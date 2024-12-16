export function init() {
    game.settings.register(
        "star-wars-status-automation",
        "encumbrance-sync-enable",
        {
            name: game.i18n.localize(
                "star-wars-status-automation.encumbrance-sync-enable.name"
            ),
            hint: game.i18n.localize(
                "star-wars-status-automation.encumbrance-sync-enable.hint"
            ),
            scope: "world",
            config: true,
            type: Boolean,
            default: true,
            requiresReload: true,
        }
    );
    game.settings.register(
        "star-wars-status-automation",
        "encumbrance-sync-status",
        {
            name: game.i18n.localize(
                "star-wars-status-automation.encumbrance-sync-status.name"
            ),
            hint: game.i18n.localize(
                "star-wars-status-automation.encumbrance-sync-status.hint"
            ),
            scope: "world",
            config: true,
            type: String,
            filePicker: "image",
            default: "icons/commodities/metal/ingot-stack-steel.webp",
        }
    );
    game.settings.register(
        "star-wars-status-automation",
        "encumbrance-talent-name",
        {
            name: game.i18n.localize(
                "star-wars-status-automation.encumbrance-talent.name"
            ),
            hint: game.i18n.localize(
                "star-wars-status-automation.encumbrance-talent.hint"
            ),
            scope: "world",
            config: true,
            type: String,
            default: "Encombrement",
        }
    );
    game.settings.register(
        "star-wars-status-automation",
        "encumbrance-over-talent-name",
        {
            name: game.i18n.localize(
                "star-wars-status-automation.encumbrance-over-talent.name"
            ),
            hint: game.i18n.localize(
                "star-wars-status-automation.encumbrance-over-talent.hint"
            ),
            scope: "world",
            config: true,
            type: String,
            default: "Sur Encombrement",
        }
    );
    game.settings.register("star-wars-status-automation", "debug-enable", {
        name: game.i18n.localize(
            "star-wars-status-automation.debug-enable.name"
        ),
        hint: game.i18n.localize(
            "star-wars-status-automation.debug-enable.hint"
        ),
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
    });
}
