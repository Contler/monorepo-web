// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fire: {
    apiKey: 'AIzaSyC7-kFPHWTHaKaP2WFjIXWoAaf9QfSyr8Q',
    authDomain: 'contler-dev.firebaseapp.com',
    databaseURL: 'https://contler-dev.firebaseio.com',
    projectId: 'contler-dev',
    storageBucket: 'contler-dev.appspot.com',
    messagingSenderId: '424830318314',
    appId: '1:424830318314:web:aa057126d096f3d747c993',
  },
  apiUrl: 'http://localhost:3000/',
  emulate: true,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
