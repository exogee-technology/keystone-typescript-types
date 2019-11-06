declare module '@keystonejs/app-admin-ui' {
    import { BaseAuthStrategy } from '@keystonejs/keystone';
    export interface AdminUIOptions<ListNames extends string = string, UserType extends {} = any> {
        adminPath?: string;
        apiPath?: string;
        graphiqlPath?: string;
        pages?: Array<any>;
        schemaName?: string;
        enableDefaultRoute?: boolean;
        authStrategy?: BaseAuthStrategy;
        isAccessAllowed?: (opts: {
            authentication: { item: UserType; list: ListNames };
        }) => boolean;
    }

    export class AdminUIApp<ListNames extends string = string, UserType extends {} = any> {
        constructor(options?: AdminUIOptions<ListNames, UserType>);
    }
}
