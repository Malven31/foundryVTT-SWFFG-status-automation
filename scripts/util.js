export function log_msg(feature, ...args) {
    // command inherited from ffg-star-wars-enhancement, modified
    if (game.settings.get("star-wars-status-automation", "debug-enable")) {
        console.log(
            "star-wars-status-automation | " + feature + " | " + args.join(" ")
        );
    }
}

export async function find_compendium_entity_by_id(type, id) {
    let packs = Array.from(await game.packs.keys());
    for (let i = 0; i < packs.length; i += 1) {
        let packId = packs[i];
        const pack = await game.packs.get(packId);
        if (pack.documentName === type) {
            const entity = await pack.getDocument(id);
            if (entity) {
                return entity;
            }
        }
    }
}
