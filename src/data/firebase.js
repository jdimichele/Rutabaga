import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

console.log(process.env);
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const fbCreateAccount = async (email, password) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  console.log(response);
  if (response) {
    console.log("User should be created...");
    return true;
  } else {
      return false;
  }
};

const fbSignIn = async (email, password) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  console.log(response);
  return response;
};

const fbAuthStateListener = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("poggers");
      callback(user);
    } else {
      callback(null);
    }
  });
};

export { app, db, auth, fbAuthStateListener, fbSignIn, fbCreateAccount };
