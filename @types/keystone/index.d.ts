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

    export type Plugin = any; // TODO: investigate what a plugin is

    export interface ResolveInputHooksOptions<Record extends {} = any> {
        resolvedData: any;
        originalInput: any; // todo: check
        existingItem: Record;
        updatedItem: Record;
        context: any; // TODO: use apollo context
        addFieldValidationError: (error: string) => any; // not clear in the documentation
        list: {
            query: (
                args: any,
                context: any,
                options?: { skipAccessControl: boolean }
            ) => Promise<Record>;
            queryMany: (
                args: any,
                context: any,
                options?: { skipAccessControl: boolean }
            ) => Promise<Record[]>;
            queryManyMeta: (
                args: any,
                context: any,
                options?: { skipAccessControl: boolean }
            ) => Promise<{ count: number }>;
            getList: (key: string) => ResolveInputHooksOptions['list']; // TODO: create a List Object and returns it
        };
    }

    export type Hooks = Partial<{
        resolveInput: (
            opts: Omit<ResolveInputHooksOptions, 'addFieldValidationError' | 'updatedItem'>
        ) => any; // TODO: return the same shape as resolvedData
        validateInput: (opts: Omit<ResolveInputHooksOptions, 'updatedItem'>) => void;
        beforeChange: (opts: Omit<ResolveInputHooksOptions, 'addFieldValidationError'>) => void;
        afterChange: (
            opts: Pick<
                ResolveInputHooksOptions,
                'updatedItem' | 'existingItem' | 'originalInput' | 'context' | 'list'
            >
        ) => void;
        beforeDelete: (
            opts: Pick<ResolveInputHooksOptions, 'existingItem' | 'context' | 'list'>
        ) => void;
        validateDelete: (
            opts: Pick<
                ResolveInputHooksOptions,
                'existingItem' | 'context' | 'list' | 'addFieldValidationError'
            >
        ) => void;
        afterDelete: (
            opts: Pick<ResolveInputHooksOptions, 'existingItem' | 'context' | 'list'>
        ) => void;
    }>;

    /**
     * Lists
     */
    export interface BaseFieldOptions {
        type: FieldType;
        isRequired?: boolean;
        isUnique?: boolean;
        hooks?: Hooks;
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

    /** Hooks */
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
        hooks?: Hooks;
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
