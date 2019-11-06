declare module '@keystonejs/app-admin-ui' {
	export interface AdminUIOptions {
		enableDefaultRoute: boolean;
		authStrategy: any; // TODO
	}

	export class AdminUIApp {
		constructor(options?: AdminUIOptions);
	}
}
