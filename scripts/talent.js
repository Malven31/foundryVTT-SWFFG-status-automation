export async function add_talent(actorData, targetTalent, ranks) {
    // Add or remove talent depending on the number of ranks
    if (ranks !== 0) {
        let possesed_talents = actorData.items?.filter((item) => {
            return item.name === targetTalent.name;
        });
        if (possesed_talents.length === 0) {
            await actorData.createEmbeddedDocuments("Item", [targetTalent]);
        }
        let talent_added = actorData.items?.filter((item) => {
            return item.name === targetTalent.name;
        })[0];
        talent_added.update({ "system.ranks.current": ranks });
    } else {
        let to_remove = actorData.items?.filter((item) => {
            return item.name === targetTalent.name;
        });
        await actorData.deleteEmbeddedDocuments(
            "Item",
            to_remove.map((item) => item.id)
        );
    }
}
