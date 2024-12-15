export function log_msg(feature, ...args) {
    // command inherited from ffg-star-wars-enhancement, modified
    if (game.settings.get("star-wars-status-automation", "debug-enable")) {
        console.log(
            "star-wars-status-automation | " + feature + " | " + args.join(" ")
        );
    }
}
