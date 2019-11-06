declare module '@keystonejs/keystone' {
    import { RequestHandler } from 'express';
    import { FieldType } from '@keystonejs/fields';

    export interface BaseKeystoneAdapter {}

    export interface KeystoneOptions {
        name: string;
        adapter: BaseKeystoneAdapter;
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

    export class Keystone {
        constructor(options: KeystoneOptions);

        createAuthStrategy(options: { type: any; list: string }): any; // TODO
        createList(name: string, schema: ListSchema): void;
        extendGraphQLSchema(schema: GraphQLExtensionSchema): void;

        prepare(options: { apps: Array<any>; dev: boolean }): Promise<KeystonePrepareResult>;
        connect(): Promise<void>;
    }
}
