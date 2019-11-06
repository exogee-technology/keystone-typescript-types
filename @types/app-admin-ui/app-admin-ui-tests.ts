import { AdminUIApp } from '@keystonejs/app-admin-ui';

new AdminUIApp();
new AdminUIApp({
    enableDefaultRoute: true,
    authStrategy: 1,
});
