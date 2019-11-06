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

    export class PasswordAuthStrategy implements BaseAuthStrategy {
        constructor(keystone: Keystone, listKey: string, config: PasswordAuthStrategyConfig);
        authType: string;

        getList(): any; // TODO
        getInputFragment(): string;

        validate(args: any): Promise<PasswordValidationResult>; // TODO

        getAdminMeta(): any; // TODO
    }
}
