declare module '@keystonejs/app-next' {
    import { BaseApp } from '@keystonejs/keystone';

    export interface NextOptions {
        dir: string;
    }

    export class NextApp extends BaseApp {
        constructor(options?: NextOptions);
    }
}
