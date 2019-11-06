declare module '@keystonejs/app-static' {
    import { BaseApp } from '@keystonejs/keystone';

    export interface StaticOptions {
        path?: string;
        src?: string;
        fallback?: string;
    }

    export class StaticApp extends BaseApp {
        constructor(options?: StaticOptions);
    }
}
