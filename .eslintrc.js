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
        window: "readonly",
        // Add other known Foundry globals
    },
    extends: ["eslint:recommended", "plugin:import/errors"],
    plugins: ["import"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {},
};
