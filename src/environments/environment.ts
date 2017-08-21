// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
   firebase: {
    apiKey: 'AIzaSyDobwf-qk7GDNXECf4YqfQ2gnSaNd8cKDc',
    authDomain: 'bludelivery-f28c2.firebaseapp.com',
    databaseURL: 'https://bludelivery-f28c2.firebaseio.com/',
    projectId: 'bludelivery-f28c2',    
  }
};
