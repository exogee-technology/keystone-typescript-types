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
