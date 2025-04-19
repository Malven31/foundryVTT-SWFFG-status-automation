module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    globals: {
        game: "readonly",
        ui: "readonly",
        canvas: "readonly",
        Hooks: "readonly",
        talent: "readonly",
        libWrapper: "readonly",
        StatusCounter: "readonly",
        // Add other known Foundry globals
    },
    extends: ["eslint:recommended", "plugin:import/errors"],
    plugins: ["import"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    settings: {
        "import/resolver": {
            node: {
                moduleDirectory: [
                    "node_modules",
                    "C:/Users/alixd/AppData/Local/FoundryVTT/Data/modules",
                ],
                extensions: [".js", ".json"],
            },
        },
    },
    rules: {
        // your rules
    },
};
