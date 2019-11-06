declare module '@keystonejs/keystone' {
    import { RequestHandler } from 'express';
    import { FieldType, AutoIncrement, CalendarDay } from '@keystonejs/fields';

    // utils type
    type ClassOf<Instance> = {
        new (...args: any[]): Instance;
    };

    type KeyValues<Keys extends string = any, Values = any> = { [key in Keys]: Values };

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
        type: FieldType;
        isRequired?: boolean;
        isUnique?: boolean;
    }

    type IfMatchingType<
        Proposed extends unknown,
        Field extends FieldType,
        Type extends {}
    > = ClassOf<Proposed> extends FieldType ? Type : never;

    export interface AutoIncrementOptions {
        gqlType?: 'Int' | 'ID';
    }

    export interface CalendarDayOptions extends BaseFieldOptions {
        format?: string;
        yearRangeFrom?: number;
        yearRangeTo?: number;
        yearPickerType?: string;
    }

    export interface ContentOptions {
        blocks: any[]; // FIXME: describe the type of block using https://www.keystonejs.com/keystonejs/field-content/
    }
    export interface DateTimeOptions extends CalendarDayOptions {
        knexOptions: any; // FIXME: provide a more precise type from the knex adaptor
    }
    export interface DecimalOptions {}
    export interface FileOptions {
        route?: string;
        adapter?: any; // FIXME: provide a file adapter type
    }

    export interface LocationOptions {
        googleMapsKey: string;
    }

    export interface OEmbedOptions {
        adapter: any; // FIXME: use eombed adapters type
    }

    export interface PasswordOptions {
        minLength: number;
        rejectCommon: boolean;
        workFactor: number;
    }

    export interface RelationshipOptions {
        // TODO: add a more type safe solution if possible
        ref: string;
        many: boolean;
    }
    export interface SelectOptions {
        // TODO: use a named type
        options: string | string[] | { value: string; label: string }[];
    }
    export interface SlugOptions<FieldNames extends string> {
        from: string;
        //Todo:  resolved data is of the same type as the current object list. Investigate if we can at least provide the available keys via a generic.
        generate: (opts: { resolvedData: KeyValues<FieldNames> }) => string;
    }

    export interface UnsplashOptions {
        accessKey: string;
        secretKey: string;
    }
    export interface UuidOptions {
        // do we have other possible values here ?
        caseTo: 'upper' | 'lower';
    }

    export interface NotImplementedFields extends BaseFieldOptions {
        type: FieldType;
    }

    export type AllFieldsOptions<FieldNames extends string = string> =
        | BaseFieldOptions
        | AutoIncrementOptions
        | CalendarDayOptions
        | ContentOptions
        | DateTimeOptions
        | DecimalOptions
        | FileOptions
        | LocationOptions
        | OEmbedOptions
        | PasswordOptions
        | RelationshipOptions
        | SelectOptions
        | SlugOptions<FieldNames>
        | UnsplashOptions
        | UuidOptions;

    export interface ListSchema<Fields extends string = string> {
        fields: { [fieldName in Fields]: AllFieldsOptions };
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
