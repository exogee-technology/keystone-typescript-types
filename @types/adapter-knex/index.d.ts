// Type definitions for @keystonejs/adapter-knex
// Project: https://github.com/keystonejs/keystone
// Definitions by: Kevin Brown <https://techin.site>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

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
