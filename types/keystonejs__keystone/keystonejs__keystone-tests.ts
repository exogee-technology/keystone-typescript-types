import { Keystone, BaseApp } from '@keystonejs/keystone';
import { PasswordAuthStrategy } from '@keystonejs/auth-password';
import { GraphQLApp } from '@keystonejs/app-graphql';
import { AdminUIApp } from '@keystonejs/app-admin-ui';
import { KnexAdapter as Adapter } from '@keystonejs/adapter-knex';
import { Text, Checkbox, Password, AutoIncrement, CalendarDay, Integer } from '@keystonejs/fields';
import { NextApp } from '@keystonejs/app-next';
import { StaticApp } from '@keystonejs/app-static';

const keystone = new Keystone({
    name: 'LiveCorp Backend',
    adapter: new Adapter(),
});

keystone.createList('Test', {
    fields: {},
    access: true,
});
keystone.createList('Test', {
    fields: {
        autoincrement: { type: AutoIncrement, gqlType: 'ID' },
        calendar: {
            type: CalendarDay,
            format: 'Do MMMM YYYY',
            yearRangeFrom: 1901,
            yearRangeTo: 2018,
            yearPickerType: 'auto',
        },
        email: { type: Text, isUnique: true },
        isAdmin: { type: Checkbox },
        password: { type: Password },
    },
});

keystone.createList('Test', {
    fields: {
        name: {
            type: Integer,
            hooks: {
                afterChange: console.info,
            },
        },
    },
    access: {
        create: true,
        read: true,
        update: false,
        delete: false,
    },
    hooks: {
        resolveInput: async ({ context }) => console.log(context),
    },
});
keystone.createList('Test', {
    fields: {
        name: {
            type: Integer,
            access: ({ authentication: { item } }) => item,
        },
    },
    access: {
        create: () => true,
        read: () => true,
        update: () => false,
        delete: () => false,
        auth: true,
    },
});

keystone.extendGraphQLSchema({});
keystone.extendGraphQLSchema({
    types: ['hi'],
    queries: [
        {
            schema: 'some schema',
            resolver: () => {},
        },
    ],
    mutations: [
        {
            schema: 'some schema',
            resolver: () => {},
        },
    ],
});

const authStrategy = keystone.createAuthStrategy({
    type: PasswordAuthStrategy,
    list: 'User',
});

const apps: BaseApp[] = [
    new GraphQLApp(),
    new AdminUIApp({ enableDefaultRoute: true, authStrategy }),
    new NextApp({
        dir: './hello',
    }),
    new StaticApp({
        path: '/',
        src: 'public',
        fallback: 'index.html',
    }),
];

keystone
    .prepare({ apps, dev: process.env.NODE_ENV !== 'production' })
    .then(async ({ middlewares }) => {
        await keystone.connect();
    });
