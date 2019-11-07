// Type definitions for @keystonejs/email 5.1
// Project: https://github.com/keystonejs/keystone
// Definitions by: Kevin Brown <https://github.com/thekevinbrown>
//                 Timothee Clain <https://github.com/tclain>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5

declare module '@keystonejs/email' {
    export type Sender = (
        fileName: string,
    ) => {
        send: (rendererOpts: any, transportOptions: any) => any;
    };
    export interface MailSenderBuilder {
        mjml: (opts?: { root?: string; transport?: string }) => Sender;
        jsx: (opts?: { root?: string; transport?: string }) => Sender;
        pug: (opts?: { root?: string; transport?: string }) => Sender;
    }

    export const emailSender: MailSenderBuilder;
}
