declare module '@keystonejs/keystone' {
    import { RequestHandler } from 'express';
    import { FieldType, AutoIncrement } from '@keystonejs/fields';

    type ClassOf<Instance> = {
        new (...args: any[]): Instance;
    };

    export interface BaseKeystoneAdapter {}

    export interface KeystoneOptions {
        name: string;
        adapter: BaseKeystoneAdapter;
    }

    export interface KeystonePrepareResult {
        middlewares: RequestHandler[];
    }

    export interface AuthenticationContext {
        authentication: { item: any }; // TODO
    }

    export interface GraphQLWhereClause {
        [field: string]: any; // TODO: Can we make this generic?
    }

    export type AccessCallback = (context: AuthenticationContext) => boolean | GraphQLWhereClause;

    /**
     * Lists
     */
    export interface BaseFieldOptions {
        isRequired?: boolean;
        isUnique?: boolean;
    }

    export interface AutoIncrementOptions extends BaseFieldOptions {
        type: AutoIncrement;
        gqlType: 'Int' | 'ID';
    }

    export interface CalendarDayOptions extends BaseFieldOptions {
        format: string;
        yearRangeFrom: number;
        yearRangeTo: number;
        yearPickerType: string;
    }

    export interface NotImplementedFields extends BaseFieldOptions {
        type: FieldType;
    }

    export type FieldOptions = AutoIncrementOptions | CalendarDayOptions | NotImplementedFields;

    export interface ListSchema<Fields extends string = string> {
        fields: { [fieldName in Fields]: FieldOptions };
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
        createList<Fields extends string = string>(name: string, schema: ListSchema<Fields>): void;
        extendGraphQLSchema(schema: GraphQLExtensionSchema): void;

        prepare(options: { apps: Array<any>; dev: boolean }): Promise<KeystonePrepareResult>;
        connect(): Promise<void>;
    }
}
