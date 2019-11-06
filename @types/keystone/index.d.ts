declare module '@keystonejs/keystone' {
    import { RequestHandler } from 'express';
    import { FieldType, AutoIncrement, CalendarDay } from '@keystonejs/fields';

    // utils type
    type ClassOf<Instance> = {
        new (...args: any[]): Instance;
    };

    type KeyValues<Keys extends string = any, Values = any> = { [key in Keys]: Values };

    export class BaseKeystoneAdapter {}
    export class BaseAuthStrategy {}
    export class BaseApp {}

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

    export interface AuthenticationContext {
        authentication: { item: any }; // TODO
    }

    export interface GraphQLWhereClause {
        [field: string]: any; // TODO: Can we make this generic?
    }

    export type AccessCallback = (context: AuthenticationContext) => boolean | GraphQLWhereClause;

    export type Plugin = any; // TODO: investigate what a plugin is
   
    /**
     * Lists
     */
    export interface BaseFieldOptions {
        type: FieldType;
        isRequired?: boolean;
        isUnique?: boolean;
    }

    export interface AutoIncrementOptions extends BaseFieldOptions {
        gqlType?: 'Int' | 'ID';
    }

    export interface CalendarDayOptions extends BaseFieldOptions {
        format?: string;
        yearRangeFrom?: number;
        yearRangeTo?: number;
        yearPickerType?: string;
    }

    export interface ContentOptions extends BaseFieldOptions {
        blocks: any[]; // FIXME: describe the type of block using https://www.keystonejs.com/keystonejs/field-content/
    }
    export interface DateTimeOptions extends CalendarDayOptions {
        knexOptions: any; // FIXME: provide a more precise type from the knex adaptor
    }
    export interface FileOptions extends BaseFieldOptions {
        route?: string;
        adapter?: any; // FIXME: provide a file adapter type
    }

    export interface LocationOptions extends BaseFieldOptions {
        googleMapsKey: string;
    }

    export interface OEmbedOptions extends BaseFieldOptions {
        adapter: any; // FIXME: use eombed adapters type
    }

    export interface PasswordOptions extends BaseFieldOptions {
        minLength: number;
        rejectCommon: boolean;
        workFactor: number;
    }

    export interface RelationshipOptions extends BaseFieldOptions {
        // TODO: add a more type safe solution if possible
        ref: string;
        many: boolean;
    }
    export interface SelectOptions extends BaseFieldOptions {
        // TODO: use a named type
        options: string | string[] | { value: string; label: string }[];
    }
    export interface SlugOptions<FieldNames extends string> extends BaseFieldOptions {
        from: string;
        //Todo:  resolved data is of the same type as the current object list. Investigate if we can at least provide the available keys via a generic.
        generate: (opts: { resolvedData: KeyValues<FieldNames> }) => string;
    }

    export interface UnsplashOptions extends BaseFieldOptions {
        accessKey: string;
        secretKey: string;
    }
    export interface UuidOptions extends BaseFieldOptions {
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
        createList<Fields extends string = string>(name: string, schema: ListSchema<Fields>): void;
        extendGraphQLSchema(schema: GraphQLExtensionSchema): void;

        prepare(options: { apps?: Array<BaseApp>; dev?: boolean }): Promise<KeystonePrepareResult>;
        executeQuery<Output = any>(query: string, config: { variables: any; context: any }): Output;
        connect(): Promise<void>;
        disconnect(): Promise<void>;
        createItems<Item>(items: { [key in ListNames]: Item[] }): Promise<void>;
    }
}
