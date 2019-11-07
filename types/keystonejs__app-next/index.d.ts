// Type definitions for @keystonejs/app-next 5.1
// Project: https://github.com/keystonejs/keystone
// Definitions by: Kevin Brown <https://github.com/thekevinbrown>
//                 Timothee Clain <https://github.com/tclain>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5

declare module '@keystonejs/app-next' {
    import { BaseApp } from '@keystonejs/keystone';

    export interface NextOptions {
        dir: string;
    }

    export class NextApp extends BaseApp {
        constructor(options?: NextOptions);
    }
}
