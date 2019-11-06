// Type definitions for @keystonejs/adapter-moogoose
// Project: https://github.com/keystonejs/keystone
// Definitions by: Kevin Brown <https://techin.site>, Timothee Clain <http://tclain.github.io>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module '@keystonejs/list-plugins' {
    import { BaseKeystoneAdapter, Plugin } from '@keystonejs/keystone';

    export interface AtTrackingOptions {
        createdAtField?: string; // TODO: insert fields here
        updatedAtField?: string;
        format?: string;
        access: any; // TODO: reuse the access controls type
    }
    type AtTracking = (options?: AtTrackingOptions) => Plugin;

    export const atTracking: AtTracking;
}
