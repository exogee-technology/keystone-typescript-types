// Type definitions for @keystonejs/app-graphql 5.0
// Project: https://github.com/keystonejs/keystone
// Definitions by: Kevin Brown <https://github.com/thekevinbrown>
//                 Timothee Clain <https://github.com/tclain>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5

declare module '@keystonejs/app-graphql' {
    export type GraphQLValidation = {
        depthLimit: (limit: number) => any; // TODO: fetch the correc type in apollo server validations
        definitionLimit: (limit: number) => any; // TODO: fetch the correc type in apollo server validations
        fieldLimit: (limit: number) => any; // TODO: fetch the correc type in apollo server validations
    };

    export interface IGraphQLAppOptions {
        apiPath?: string;
        graphiqlPath?: string;
        schemaName?: string;
        apollo?: {
            validationRules?: [];
        };
    }

    export class GraphQLApp {
        constructor(opts?: IGraphQLAppOptions);
    }

    export const validation: GraphQLValidation;
}
