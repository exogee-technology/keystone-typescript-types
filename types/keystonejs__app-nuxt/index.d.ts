// Type definitions for @keystonejs/app-nuxt 5.1
// Project: https://github.com/keystonejs/keystone
// Definitions by: Kevin Brown <https://github.com/thekevinbrown>
//                 Timothee Clain <https://github.com/tclain>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5

declare module '@keystonejs/app-nuxt' {
    import { BaseApp } from '@keystonejs/keystone';

    export interface NuxtOptions {
        srcDir?: string;
        buildDir?: string;
    }

    export class NuxtApp extends BaseApp {
        constructor(options?: NuxtOptions);
    }
}
