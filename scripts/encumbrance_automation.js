import { log_msg as log } from "./util.js";

let module_name = "encumbrance_automation";

}

async function update_status(token, ranks, over) {
    // command inherited from ffg-star-wars-enhancement, modified
    // pull the path of the status to apply
    update_talent(token, ranks);
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
        // no need to search for the effect ourselves, as this is done in the underlying libraries
        log(module_name, "Adding status rank " + ranks + " to token");
        let status_rank = over ? 0 : ranks;
        let status_over_rank = status_rank !== 0 ? 0 : ranks;
        let new_counter = new ActiveEffectCounter(
            status_rank,
            status,
            token.document
        );
        let new_counter_over = new ActiveEffectCounter(
            status_over_rank,
            status_over,
            token.document
        );
        // render it
        if (active) {
            if (status_rank !== 0) {
                await new_counter.update();
            } else {
                await new_counter.setValue(0);
            }
            if (status_over_rank !== 0) {
                await new_counter_over.update();
            } else {
                await new_counter_over.setValue(0);
            }
        } else {
            await new_counter.setValue(0);
            await new_counter_over.setValue(0);
        }
    }
}

export function encumbrance_sync(source, ...args) {
    // command inherited from ffg-star-wars-enhancement, modified
    // check if the user is a GM
    if (game.user.isGM) {
        try {
            let enabled = game.settings.get(
                "star-wars-status-automation",
                "encumbrance-sync-enable"
            );

            /*
                We can't modify tokens that aren't currently rendered, so we hook the update actor AND scene load calls
                (and handle each a different way)
             */
            if (source === "updateActor" || source === "updateItem") {
                let actor;
                if (source === "updateActor") {
                    if (
                        args[1] &&
                        args[1].hasOwnProperty("system") &&
                        args[1]["system"].hasOwnProperty("stats") &&
                        args[1]["system"]["stats"].hasOwnProperty("encumbrance")
                    ) {
                        actor = args[0];
                    } else {
                        return;
                    }
                } else if (source === "updateItem") {
                    if (
                        args[0] &&
                        args[0].hasOwnProperty("parent") &&
                        args[0]["parent"] !== null
                    ) {
                        actor = args[0].actor;
                    } else {
                        return;
                    }
                }

                if (actor === null || actor.type !== "character") {
                    return;
                }
                log(module_name, "character and needs an update");

                // look up relevant info
                let actor_id = actor["_id"];
                let tokens = canvas.tokens.placeables.filter(
                    (token) => token.document.actorId === actor_id
                );

                // update the tokens
                if (enabled == true) {
                    let encumbrance_amount =
                        parseInt(
                            actor["system"]["stats"]["encumbrance"]["value"]
                        ) -
                        parseInt(
                            actor["system"]["stats"]["encumbrance"]["max"]
                        );
                    if (encumbrance_amount < 0) {
                        encumbrance_amount = 0;
                    }
                    let over =
                        parseInt(
                            actor["system"]["stats"]["encumbrance"]["value"]
                        ) >
                        parseInt(
                            actor["system"]["characteristics"]["Brawn"]["value"]
                        ) *
                            2 +
                            5;
                    log(
                        module_name,
                        "updateActor|updateItem: updating tokens now"
                    );
                    for (var x = 0; x < tokens.length; x++) {
                        update_status(tokens[x], encumbrance_amount, over);
                    }
                } else {
                    for (var x = 0; x < tokens.length; x++) {
                        update_status(tokens[x], 0, false);
                    }
                }
            } else if (source === "canvasReady") {
                update_encumbrance();
            }
        } catch (exception) {
            // something went wrong, bail (silently)
            console.error("Failed to sync encumbrance: " + exception);
        }
    }
}

export function update_encumbrance() {
    if (game.user.isGM) {
        let enabled = game.settings.get(
            "star-wars-status-automation",
            "encumbrance-sync-enable"
        );
        let tokens = canvas.tokens.placeables.filter((token) => token);
        for (var x = 0; x < tokens.length; x++) {
            let token = tokens[x];
            let actor = game.actors.get(token.document.actorId);
            if (actor.type !== "character") {
                return;
            }
            if (enabled == true) {
                let encumbrance_amount =
                    actor?.system?.stats?.encumbrance?.value;
                if (encumbrance_amount !== undefined) {
                    encumbrance_amount =
                        parseInt(actor.system.stats.encumbrance.value) -
                        parseInt(actor.system.stats.encumbrance.max);
                    if (encumbrance_amount < 0) {
                        encumbrance_amount = 0;
                    }
                    let over =
                        parseInt(actor.system.stats.encumbrance.value) >
                        parseInt(actor.system.characteristics.Brawn.value) * 2 +
                            5;
                    // update the tokens
                    log(module_name, "canvasReady: updating tokens now");
                    update_status(token, encumbrance_amount, over);
                }
            } else {
                update_status(token, 0, false);
            }
        }
    }
}
