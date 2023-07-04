const firebase = require('firebase-admin');
const firebaseConfig = {
  apiKey: "AIzaSyB6HZpTB8jB9s11ZZUfI0ykMfoDk68RILU",
  authDomain: "bddmartialchat.firebaseapp.com",
  projectId: "bddmartialchat",
  storageBucket: "bddmartialchat.appspot.com",
  messagingSenderId: "241624857396",
  appId: "1:241624857396:web:e1ead93384a32039f80361",
  measurementId: "G-PKG1WRP8PK"
}
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
const Thread = db.collection("ThreadList");
//export the module User
module.exports= User
module.exports= Thread

