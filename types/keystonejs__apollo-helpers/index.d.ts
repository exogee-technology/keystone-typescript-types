// Type definitions for @keystonejs/apollo-helpers 5.1
// Project: https://github.com/keystonejs/keystone
// Definitions by: Kevin Brown <https://github.com/thekevinbrown>
//                 Timothee Clain <https://github.com/tclain>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5

import * as React from 'react';
import { KeyValues } from '@keystonejs/keystone';

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
        React.ReactElement<KeystoneMutationTypeProps> | React.ReactElement<KeystoneMutationTypeProps>
    >,
) => React.ComponentType;
