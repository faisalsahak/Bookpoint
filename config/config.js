import firebase from 'firebase';

//firebase API detailss
const config = {
    apiKey: "AIzaSyAWrDPIoT_HjpuzaLveWr8SXI0umo7fk5k",
    authDomain: "bookpoint-46002.firebaseapp.com",
    databaseURL: "https://bookpoint-46002.firebaseio.com",
    projectId: "bookpoint-46002",
    storageBucket: "bookpoint-46002.appspot.com",
    messagingSenderId: "662076989333"
  };

firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();