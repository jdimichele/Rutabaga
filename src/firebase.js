/* Firebase */
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBz3H85u8RbIBCp3ZJikkat1OpVt5MsYkk",
  authDomain: "rutabaga-d932a.firebaseapp.com",
  databaseURL: "https://rutabaga-d932a-default-rtdb.firebaseio.com",
  projectId: "rutabaga-d932a",
  storageBucket: "rutabaga-d932a.appspot.com",
  messagingSenderId: "896572573197",
  appId: "1:896572573197:web:d5999971af785dbe07b744",
  measurementId: "G-6WDBGQY8TY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const db = firebaseApp.firestore();

export { timestamp, db };
