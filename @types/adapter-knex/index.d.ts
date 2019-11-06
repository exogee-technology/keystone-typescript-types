// Type definitions for @keystonejs/adapter-knex
// Project: https://github.com/keystonejs/keystone
// Definitions by: Kevin Brown <https://techin.site>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module '@keystonejs/adapter-knex' {
    import { Raw } from 'knex';
    import { BaseKeystoneAdapter } from '@keystonejs/keystone';

    export interface KnexOptions {
        client: string;
    }
    export class KnexAdapter implements BaseKeystoneAdapter {
        constructor(options?: { knexOptions?: any; schemaName?: string });

        public disconnect(): void;
        public dropDatabase(): Promise<Raw>;
    }
}
