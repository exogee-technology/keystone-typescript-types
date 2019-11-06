import { atTracking } from '@keystonejs/list-plugins';

export const pluginWoOptions = atTracking();

export const pluginWithOptions = atTracking({
    access: {},
    createdAtField: 'field',
});
