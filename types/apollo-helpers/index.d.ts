import { KeyValues } from '@keystonejs/keystone';

declare module '@keystone/apollo-helpers' {
    export type KeystoneQueryTypeProps = { query: string };
    export type KeystoneQueryType = React.ComponentType<KeystoneQueryTypeProps>;
    export const Query: KeystoneQueryType;

    export type KeystoneMutationTypeProps = { mutation: String; invalidatesTypes?: boolean };
    export type KeystoneMutationType = React.ComponentType<KeystoneMutationTypeProps>;
    export const Mutation: KeystoneMutationType;

    export const KeystoneProvider: React.ComponentType;

    export const injectIsOptimisticFlag: (opts: any) => any; // TODO: insert the apollo type here
    export const flattenApollo: (
        opts: KeyValues<
            string,
            | React.ReactElement<KeystoneMutationTypeProps>
            | React.ReactElement<KeystoneMutationTypeProps>
        >
    ) => React.ComponentType;
}
