export function init() {
    game.settings.register(
        // @ts-ignore
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
        // @ts-ignore
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
            default: "modules/star-wars-status-automation/icons/weight.webp",
        }
    );
    game.settings.register(
        // @ts-ignore
        "star-wars-status-automation",
        "encumbrance-sync-status-over",
        {
            name: game.i18n.localize(
                "star-wars-status-automation.encumbrance-sync-status-over.name"
            ),
            hint: game.i18n.localize(
                "star-wars-status-automation.encumbrance-sync-status-over.hint"
            ),
            scope: "world",
            config: true,
            type: String,
            filePicker: "image",
            default:
                "modules/star-wars-status-automation/icons/weight_over.webp",
        }
    );
    game.settings.register(
        // @ts-ignore
        "star-wars-status-automation",
        "encumbrance-talent-id",
        {
            name: game.i18n.localize(
                "star-wars-status-automation.encumbrance-talent-id.name"
            ),
            hint: game.i18n.localize(
                "star-wars-status-automation.encumbrance-talent-id.hint"
            ),
            scope: "world",
            config: false,
            type: String,
            default: "LeYgHPRqiQiLb8uR",
        }
    );
    game.settings.register(
        // @ts-ignore
        "star-wars-status-automation",
        "debug-enable",
        {
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
        }
    );
}
