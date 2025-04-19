declare global {
    interface Window {
        EffectCounter: any;
        ActiveEffectCounter: any;
        Babele: typeof Babele;
    }

    const Babele: {
        get(): {
            register(options: {
                module: string;
                lang: string;
                dir: string;
            }): void;
        };
    };
}

export {};
