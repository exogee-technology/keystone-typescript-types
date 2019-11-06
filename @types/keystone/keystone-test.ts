import express from 'express';
import { Keystone } from '@keystonejs/keystone';
import { PasswordAuthStrategy } from '@keystonejs/auth-password';
import { GraphQLApp } from '@keystonejs/app-graphql';
import { AdminUIApp } from '@keystonejs/app-admin-ui';
import { KnexAdapter as Adapter } from '@keystonejs/adapter-knex';
import { Text, Checkbox, Password } from '@keystonejs/fields';

const keystone = new Keystone({
    name: 'LiveCorp Backend',
    adapter: new Adapter(),
});

keystone.createList('Test', {
    fields: {
        name: { type: Text },
        email: { type: Text, isUnique: true },
        isAdmin: { type: Checkbox },
        password: { type: Password },
    },
    access: true,
});

const authStrategy = keystone.createAuthStrategy({
    type: PasswordAuthStrategy,
    list: 'User',
});

const apps = [
    new GraphQLApp(),
    new AdminUIApp({ enableDefaultRoute: true, authStrategy }),
];

keystone
    .prepare({ apps, dev: process.env.NODE_ENV !== 'production' })
    .then(async ({ middlewares }) => {
        await keystone.connect();

        const app = express();
        app.use(middlewares).listen(3000);
    });
