declare global {
    const EffectCounter: {
        findCounter(tokenDoc: any, iconPath: string): any;
    };

    const ActiveEffectCounter: {
        setValue(value: number): Promise<void>;
        remove(): Promise<void>;
        getCounter(effect: any): Promise<any>;
    };
}

export {};
