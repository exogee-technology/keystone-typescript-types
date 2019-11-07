// Type definitions for @keystonejs/list-plugins
// Project: https://github.com/keystonejs/keystone
// Definitions by: Kevin Brown <https://techin.site>, Timothee Clain <http://tclain.github.io>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module '@keystonejs/list-plugins' {
    import { BaseKeystoneAdapter, Plugin } from '@keystonejs/keystone';

    export interface TrackingOptions {
        createdAtField?: string; // TODO: insert fields here
        updatedAtField?: string;
        access: any; // TODO: reuse the access controls type
    }
    export interface AtTrackingOptions extends TrackingOptions {
        format?: string;
    }
    export interface ByTrackingOptions extends TrackingOptions {
        ref?: string; // TODO: investigate list names
    }

    type AtTrackingPluginProvider = (options?: AtTrackingOptions) => Plugin;
    type ByTrackingPluginProvider = (options?: ByTrackingOptions) => Plugin;

    export const atTracking: AtTrackingPluginProvider;
    export const byTracking: ByTrackingPluginProvider;
}
