// Type definitions for @keystonejs/auth-password 5.1
// Project: https://github.com/keystonejs/keystone
// Definitions by: Kevin Brown <https://github.com/thekevinbrown>
//                 Timothee Clain <https://github.com/tclain>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5

declare module '@keystonejs/auth-password' {
    import { Keystone, BaseAuthStrategy } from '@keystonejs/keystone';

    export interface PasswordAuthStrategyConfig {
        identityField: string;
        secretField: string;
    }

    export interface PasswordValidationResult {
        success: boolean;
        list: any;
        item: any;
        message: string;
    }

    export class PasswordAuthStrategy extends BaseAuthStrategy {
        constructor(keystone: Keystone, listKey: string, config: PasswordAuthStrategyConfig);
        authType: string;

        getList(): any; // TODO
        getInputFragment(): string;

        validate(args: any): Promise<PasswordValidationResult>; // TODO

        getAdminMeta(): any; // TODO
    }
}
