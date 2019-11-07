// Type definitions for @keystonejs/app-admin-ui 5.1
// Project: https://github.com/keystonejs/keystone
// Definitions by: Kevin Brown <https://github.com/thekevinbrown>
//                 Timothee Clain <https://github.com/tclain>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5

declare module '@keystonejs/app-admin-ui' {
    import { BaseAuthStrategy, BaseApp } from '@keystonejs/keystone';
    export interface AdminUIOptions<ListNames extends string = string, UserType extends {} = any> {
        adminPath?: string;
        apiPath?: string;
        graphiqlPath?: string;
        pages?: Array<any>;
        schemaName?: string;
        enableDefaultRoute?: boolean;
        authStrategy?: BaseAuthStrategy;
        isAccessAllowed?: (opts: { authentication: { item: UserType; list: ListNames } }) => boolean;
    }

    export class AdminUIApp<ListNames extends string = string, UserType extends {} = any> extends BaseApp {
        constructor(options?: AdminUIOptions<ListNames, UserType>);
    }
}
