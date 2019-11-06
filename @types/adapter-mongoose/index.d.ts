// Type definitions for @keystonejs/adapter-moogoose
// Project: https://github.com/keystonejs/keystone
// Definitions by: Kevin Brown <https://techin.site>, Timothee Clain <http://tclain.github.io>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module '@keystonejs/adapter-mongoose' {
    import { Raw, ConnectionConfig, Config } from 'knex';
    import { BaseKeystoneAdapter } from '@keystonejs/keystone';

    export interface MongooseAdaptorOptions {
        mongoUri: string;
    }
    export class MoogooseAdapter extends BaseKeystoneAdapter {
        constructor(options?: MongooseAdaptorOptions);

        public disconnect(): void;
        public dropDatabase(): Promise<Raw>;
    }
}
