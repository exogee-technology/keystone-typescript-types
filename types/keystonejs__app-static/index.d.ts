// Type definitions for @keystonejs/app-static 5.1
// Project: https://github.com/keystonejs/keystone
// Definitions by: Kevin Brown <https://github.com/thekevinbrown>
//                 Timothee Clain <https://github.com/tclain>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5

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
