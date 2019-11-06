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
    }
    export class KnexAdapter implements BaseKeystoneAdapter {
        constructor(options?: KnexAdaptorOptions);

        public disconnect(): void;
        public dropDatabase(): Promise<Raw>;
    }
}
