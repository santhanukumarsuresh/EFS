// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyBYEm-AGy8B5l7OtMgaAbzINNwqHz5waS0",
    authDomain: "effectivefilesharing.firebaseapp.com",
    databaseURL: "https://effectivefilesharing.firebaseio.com",
    projectId: "effectivefilesharing",
    storageBucket: "effectivefilesharing.appspot.com",
    messagingSenderId: "566414905589"
  }
};
