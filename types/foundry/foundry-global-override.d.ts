// foundry-global-override.d.ts
interface ClientSettings {
    get(namespace: string, key: string): any;
}
