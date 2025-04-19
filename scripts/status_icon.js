import { get_encumbrance_talent } from "./encumbrance_automation.js";
import { add_talent } from "./talent.js";
import { log_msg as log } from "./util.js";

let module_name = "status_icon";

async function update_talent(actor, ranks) {
    let encumbered_talent = await get_encumbrance_talent();
    await add_talent(actor, encumbered_talent, ranks);
}

export async function update_status(token, ranks, over) {
    // command inherited from ffg-star-wars-enhancement, modified
    // pull the path of the status to apply
    let status = game.settings.get(
        "star-wars-status-automation",
        "encumbrance-sync-status"
    );
    let status_over = game.settings.get(
        "star-wars-status-automation",
        "encumbrance-sync-status-over"
    );
    let active = ranks !== 0;

    if (!window.EffectCounter) {
        // the user doesn't have status icon counters installed; they don't get a count
        log(module_name, "Adding status to token");
        if (over) {
            token.toggleEffect(status_over, { active: active });
            token.toggleEffect(status, { active: !active });
        } else {
            token.toggleEffect(status, { active: active });
            token.toggleEffect(status_over, { active: !active });
        }
    } else {
        // Use the proper API approach
        log(module_name, "Adding status rank " + ranks + " to token");

        // Determine which icon to use and what rank to set
        let activeIcon = over ? status_over : status;
        let inactiveIcon = over ? status : status_over;

        if (active) {
            // First, find if the counter already exists
            let counter = EffectCounter.findCounter(token.document, activeIcon);

            if (!counter) {
                // If actor has the effect but no counter, get it through the actor
                const effect = token.actor.effects.find(
                    (e) => e.img === activeIcon
                );
                if (effect) {
                    counter = ActiveEffectCounter.getCounter(effect);
                }

                // If still no counter, we need to add the effect first
                if (!counter) {
                    // Add the effect first - this would require creating an ActiveEffect
                    // This part depends on your system's API for adding effects
                    const effectData = {
                        label: over ? "Overencumbered" : "Encumbered",
                        icon: activeIcon,
                        flags: {
                            core: {
                                statusId: over
                                    ? "overencumbered"
                                    : "encumbered",
                            },
                        },
                    };

                    await token.actor.createEmbeddedDocuments("ActiveEffect", [
                        effectData,
                    ]);

                    // Now get the counter for the newly created effect
                    const effect = token.actor.effects.find(
                        (e) => e.img === activeIcon
                    );
                    counter = effect
                        ? ActiveEffectCounter.getCounter(effect)
                        : null;
                }
            }

            // Set the value if we have a counter
            if (counter) {
                await counter.setValue(ranks);
            }

            // Remove the inactive effect if it exists
            const inactiveCounter = EffectCounter.findCounter(
                token.document,
                inactiveIcon
            );
            if (inactiveCounter) {
                await inactiveCounter.remove();
            }
        } else {
            // Remove both effects when inactive
            const statusCounter = EffectCounter.findCounter(
                token.document,
                status
            );
            const overCounter = EffectCounter.findCounter(
                token.document,
                status_over
            );

            if (statusCounter) await statusCounter.remove();
            if (overCounter) await overCounter.remove();
        }
    }

    await update_talent(token.actor, ranks);
}
