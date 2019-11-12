# keystone-typescript-types

A work in progress repo to get the types for KeystoneJS 5 ready to contribute to Definitely Typed.

## Usage

### Install

To use with your version of Keystone, install the package as a dev dependency:

```
$ npm i --save-dev keystone-typescript-types
```

### Configure

Then set up Typescript so it knows how to find these types by creating or editing the `typeRoots` value in your `tsconfig.json` file:

```javascript
{
	"compilerOptions": {
		// The rest of your existing
		"typeRoots": ["node_modules/keystone-typescript-types/types"]
	}
}

```

### Use

Since the Keystone CLI doesn't support Typescript, we need to set up a custom server:

```typescript
// src/index.ts

import express from 'express';
import { Keystone } from '@keystonejs/keystone';
import { PasswordAuthStrategy } from '@keystonejs/auth-password';
import { GraphQLApp } from '@keystonejs/app-graphql';
import { AdminUIApp } from '@keystonejs/app-admin-ui';
import { KnexAdapter as Adapter } from '@keystonejs/adapter-knex';

const keystone = new Keystone({
    name: 'Your Project Name',
    adapter: new Adapter(),
});

// Create your lists here

const authStrategy = keystone.createAuthStrategy({
    type: PasswordAuthStrategy,
    list: 'User',
});

const apps = [new GraphQLApp(), new AdminUIApp({ enableDefaultRoute: true, authStrategy })];

keystone
    .prepare({ apps, dev: process.env.NODE_ENV !== 'production' })
    .then(async ({ middlewares }) => {
        await keystone.connect();

        const app = express();
        app.use(middlewares).listen(3000);

        console.log('Keystone is running!');
        console.log();
        console.log(`🔗 Keystone Admin UI:	http://localhost:3000/admin`);
        console.log(`🔗 GraphQL Playground:	http://localhost:3000/admin/graphiql`);
        console.log(`🔗 GraphQL API:		http://localhost:3000/admin/api`);
    });
```

And we also need to make a change to the scripts in `package.json`:

```javascript
{
    "scripts": {
		"dev": "cross-env NODE_ENV=development DISABLE_LOGGING=true ts-node --files index.ts",
        // "build": "cross-env NODE_ENV=production keystone build", TODO, handle admin UI build outside of CLI
		"start": "npm run dev"
    }
}
```

And you should be good to go.

## Contributing

These are very rough typings. Contributions are welcomed.

## Progress

### Packages

#### DEPLOYMENT

-   [x] @keystonejs/keystone
-   [x] @keystonejs/fields

#### APPS

-   [x] @keystonejs/app-admin-ui
-   [x] @keystonejs/app-next
-   [x] @keystonejs/app-nuxt
-   [x] @keystonejs/app-static

        FIELD ADAPTERS

-   [x] @keystonejs/file-adapters
-   [ ] @keystonejs/oembed-adapters

        AUTHENTICATION STRATEGIES

-   [x] @keystonejs/auth-password
-   [ ] @keystonejs/auth-passport

#### UTILITIES

-   [x] @keystonejs/list-plugins
-   [x] @keystonejs/apollo-helpers
-   [x] @keystonejs/email
-   [x] @keystonejs/logger
-   [x] @keystonejs/session

#### DATABASE ADAPTERS

-   [x] @keystonejs/adapter-knex
-   [x] @keystonejs/adapter-mongoose

### By features

-   [ ] Keystone (in progress)
    -   [x] apps
        -   [x] admin
        -   [x] graphql
        -   [x] nextjs
        -   [x] nuxtjs
        -   [x] static app
    -   [ ] plugins (in progress)
    -   [ ] adapters
-   [ ] createList
    -   [x] fields (simple union)
    -   [ ] adapter
    -   [x] hooks
-   [ ] Authentication Strategies
    -   [x] password
    -   [ ] passport
-   [x] Access Control
-   [x] Query validation
-   [x] hooks validation
-   [x] Database adapters
    -   [x] Mongoose Adapter:
        -   [x] connection
        -   [x] listAdapterClass
    -   [x] Knex Adapter
        -   [x] connection
        -   [x]listAdapterClass
-   [x] List plugins
-   [] File Adapter
