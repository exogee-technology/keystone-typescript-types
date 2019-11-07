// Type definitions for @keystonejs/adapter-knex 5.1
// Project: https://github.com/keystonejs/keystone
// Definitions by: Kevin Brown <https://github.com/thekevinbrown>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5

declare module '@keystonejs/adapter-knex' {
    import { Raw, ConnectionConfig, Config } from 'knex';
    import { BaseKeystoneAdapter } from '@keystonejs/keystone';

    export interface KnexAdaptorOptions {
        knexOptions?: Config;
        schemaName?: string;
        listAdapterClass?: any;
    }
    export class KnexAdapter extends BaseKeystoneAdapter {
        constructor(options?: KnexAdaptorOptions);

        public disconnect(): void;
        public dropDatabase(): Promise<Raw>;
    }
}
