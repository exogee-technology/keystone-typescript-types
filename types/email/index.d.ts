declare module '@keystonejs/email' {
    export type Sender = (
        fileName: string
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
