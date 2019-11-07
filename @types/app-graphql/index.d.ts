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
