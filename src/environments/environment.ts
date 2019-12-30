// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	isMockEnabled: true, // You have to switch this, when your real back-end is done
	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
	// baseUrl: $ENV.API_URL,
	// versionfile: $ENV.VERSION_PATH,
	//baseUrl:'https://dev-newprompt-backend.azurewebsites.net/',
	baseUrl:'http://172.25.29.38:88/api',
    versionfile: '',
};
