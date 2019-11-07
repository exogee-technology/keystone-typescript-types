// Type definitions for @keystonejs/adapter-moogoose 5.1
// Project: https://github.com/keystonejs/keystone
// Definitions by: Kevin Brown <https://github.com/thekevinbrown>
//                 Timothee Clain <https://github.com/tclain>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5

declare module '@keystonejs/adapter-mongoose' {
    import { BaseKeystoneAdapter } from '@keystonejs/keystone';

    export interface MongooseAdaptorOptions {
        mongoUri: string;
        listAdapterClass?: any;
    }
    export class MoogooseAdapter extends BaseKeystoneAdapter {
        constructor(options?: MongooseAdaptorOptions);

        public disconnect(): void;
        public dropDatabase(): any;
    }
}
