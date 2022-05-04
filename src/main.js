import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

/* Custom Global Components */
// import CategoryCardListLayout from './components/categorylayout'

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Firebase Imports
import * as firebase from "@firebase/app";

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// const db = getFirestore(firebase);
// const storage = getStorage(firebase);
// const provider = new GoogleAuthProvider();

// /* Firebase Functions */

// onAuthStateChanged(auth, (user) => {
//   if (user != null) {
//     console.log("User logged in.");
//   } else {
//     console.log("No user.");
//   }
// });

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });


const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
  
router.isReady().then(() => {
  app.mount('#app');
});