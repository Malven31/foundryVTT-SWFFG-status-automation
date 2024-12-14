async function update_status(token, ranks, icon_path) {
    let active = ranks !== 0;
    if (!window.EffectCounter) {
        // the user doesn't have status icon counters installed; they don't get a count
        token.toggleEffect(icon_path, { active: active });
    } else {
        // no need to search for the effect ourselves, as this is done in the underlying libraries
        let new_counter = new ActiveEffectCounter(
            ranks,
            icon_path,
            token.document
        );
        // render it
        if (active) {
            await new_counter.update();
        } else {
            await new_counter.setValue(0);
        }
    }
}

export function encumbrance_sync(source, ...args) {
    // check if the user is a GM
    if (
        game.user.isGM &&
        game.settings.get(
            "star-wars-status-automation",
            "encumbrance-sync-enable"
        )
    ) {
        try {
            // pull the path of the status to apply
            let status = game.settings.get(
                "star-wars-status-automation",
                "encumbrance-sync-status"
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
                    actor = args[0].actor;
                }

                if (actor.type !== "character") {
                    return;
                }

                // look up relevant info
                let actor_id = actor["_id"];
                let encumbrance_amount =
                    parseInt(actor["system"]["stats"]["encumbrance"]["value"]) -
                    parseInt(actor["system"]["stats"]["encumbrance"]["max"]);
                if (encumbrance_amount < 0) {
                    encumbrance_amount = 0;
                }
                let tokens = canvas.tokens.placeables.filter(
                    (token) => token.document.actorId === actor_id
                );

                // update the tokens
                for (var x = 0; x < tokens.length; x++) {
                    update_status(tokens[x], encumbrance_amount, status);
                }
            } else if (source === "canvasReady") {
                let tokens = canvas.tokens.placeables.filter((token) => token);
                for (var x = 0; x < tokens.length; x++) {
                    let token = tokens[x];
                    let actor = game.actors.get(token.document.actorId);
                    if (actor.type !== "character") {
                        return;
                    }
                    let encumbrance_amount =
                        actor?.system?.stats?.encumbrance?.value;
                    if (encumbrance_amount !== undefined) {
                        encumbrance_amount =
                            parseInt(actor.system.stats.encumbrance.value) -
                            parseInt(actor.system.stats.encumbrance.max);
                        if (encumbrance_amount < 0) {
                            encumbrance_amount = 0;
                        }
                        // update the tokens
                        update_status(token, encumbrance_amount, status);
                    }
                }
            }
        } catch (exception) {
            // something went wrong, bail (silently)
            console.log(
                module_name,
                "Failed to sync encumbrance: " + exception
            );
        }
    }
}
