import firebase from 'firebase/app';

export const appName = 'brazers-bets';

const config = {
  apiKey: 'AIzaSyCmmm4B1s-cqdEIyhbQcZEj9fBKsOiIZo0',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: "436497401902"
};

firebase.initializeApp(config);