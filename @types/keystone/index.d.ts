declare module '@keystonejs/keystone' {
    import { RequestHandler } from 'express';
    import { FieldType } from '@keystonejs/fields';

    export interface BaseKeystoneAdapter {}
    export interface BaseAuthStrategy {}

    export interface KeystoneOptions {
        name: string;
        adapter: BaseKeystoneAdapter;
        adapters?: {
            [key: string]: BaseKeystoneAdapter;
        };
        defaultAdapter?: string;
        onConnect?: () => void;
        cookieSecret?: string;
        cookieMaxAge?: number;
        secureCookies?: boolean;
        sessionStore?: any; // TODO: bring in express session types
        schemaNames?: string[];
        queryLimits?: {
            maxTotalResults?: number;
        };
    }

    export interface KeystonePrepareResult {
        middlewares: RequestHandler[];
    }

    export interface FieldOptions {
        type: FieldType;
        isRequired?: boolean;
        isUnique?: boolean;
    }

    export interface AuthenticationContext {
        authentication: { item: any }; // TODO
    }

    export interface GraphQLWhereClause {
        [field: string]: any; // TODO: Can we make this generic?
    }

    export type AccessCallback = (context: AuthenticationContext) => boolean | GraphQLWhereClause;

    export type Plugin = any; // TODO: investigate what a plugin is
    export interface ListSchema {
        fields: { [fieldName: string]: FieldOptions };
        access?:
            | boolean
            | {
                  read?: boolean | GraphQLWhereClause | AccessCallback;
                  update?: boolean | AccessCallback;
                  create?: boolean | AccessCallback;
                  delete?: boolean | AccessCallback;
                  auth?: boolean;
              };
        plugins?: Plugin[];
    }

    export interface GraphQLExtension {
        schema: string;
        resolver: Function; // TODO
    }

    export interface GraphQLExtensionSchema {
        types?: string[];
        queries?: GraphQLExtension[];
        mutations?: GraphQLExtension[];
    }

    export class Keystone<ListNames extends string = string> {
        constructor(options: KeystoneOptions);

        createAuthStrategy(options: { type: BaseAuthStrategy; list: ListNames; config?: any }): any; // TODO
        createList(name: ListNames, schema: ListSchema): void;
        extendGraphQLSchema(schema: GraphQLExtensionSchema): void;

        prepare(options: { apps: Array<any>; dev: boolean }): Promise<KeystonePrepareResult>;
        executeQuery<Output = any>(query: string, config: { variables: any; context: any }): Output;
        connect(): Promise<void>;
        disconnect(): Promise<void>;
        createItems<Item>(items: { [key in ListNames]: Item[] }): Promise<void>;
    }
}
