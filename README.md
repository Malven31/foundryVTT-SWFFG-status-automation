![](https://img.shields.io/badge/Foundry-v12-informational)

<!--- Downloads @ Latest Badge -->
<!--- replace <user>/<repo> with your username/repository -->
<!--- ![Latest Release Download Count](https://img.shields.io/github/downloads/<user>/<repo>/latest/module.zip) -->

<!--- Forge Bazaar Install % Badge -->
<!--- replace <your-module-name> with the `name` in your manifest -->
<!--- ![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2F<your-module-name>&colorB=4aa94a) -->

# FFG Star Wars Status Automation

Module intended to provide automations for the [StarWarsFFG FoundryVTT system](https://github.com/StarWarsFoundryVTT/StarWarsFFG) without including any copyrighted content.

## Goals

Ths module is an attempt to automate parts of the [StarWarsFFG FoundryVTT system](https://github.com/StarWarsFoundryVTT/StarWarsFFG) that are tidious to track, mainly using status icons.

**Note:** We do not aim to include any core-rule features. If it's something the FFG Star Wars system defines in rules, we believe the system module should support it. This module is about enhancing the play experience, not implementing the rules.

## Features

### Encumbrance

- Automate Encumbrance display (Token Status)
  - Grey weight icon for Encumbrance (over `5 + BRAWN`)
  - Red weight icon for Over-Encumbrance (over `5 + (BRAWN * 2)`)
- Encumbrance "Talent" added to add Setback dices to all Brawn and Agility checks.
  - Encumbrance adds a rank, that adds a Setback.

## Thanks

This module is a first attempt.

I've been hugely inspired by the of [Wrycu](https://github.com/wrycu) and his [StarWarsFFG-Enhancements](https://github.com/wrycu/StarWarsFFG-Enhancements) module. Due to my lack of self estime, I don't feel legit contributing to such a module, so I'm proposing my own complement. Maybe some day, this module's features will be legit enough to be considered, but such a day has not come yet.

Special thank yous to all members of the [FoundryVTT Discord server](https://discord.gg/foundryvtt), who always take time to answer and help with kindness, and specialy :

- `@Wrycu`
- `@ZerthofGith`
- `@mxzf`
