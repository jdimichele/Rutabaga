/* Firebase */
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc } from "firebase/firestore";
import { PluginFirestore, PluginVue3, Magnetar } from "magnetar";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBz3H85u8RbIBCp3ZJikkat1OpVt5MsYkk",
  authDomain: "rutabaga-d932a.firebaseapp.com",
  databaseURL: "https://rutabaga-d932a-default-rtdb.firebaseio.com",
  projectId: "rutabaga-d932a",
  storageBucket: "rutabaga-d932a.appspot.com",
  messagingSenderId: "896572573197",
  appId: "1:896572573197:web:d5999971af785dbe07b744",
  measurementId: "G-6WDBGQY8TY",
});

const db = getFirestore(firebaseApp);

function generateRandomId() {
  return doc(collection(db, "random")).id;
}

// ---------------------------------------------
// 1. the plugin firestore for remote data store
//    create the remote store plugin instance & pass your `db`:
// ---------------------------------------------
const remote = PluginFirestore.CreatePlugin({ db });

// ---------------------------------------
// 2. the plugin vue3 for local data store
//    create the local store plugin instance & pass your `generateRandomId`:
// ---------------------------------------
const local = PluginVue3.CreatePlugin({ generateRandomId });

// -----------------------------------------------------
// 3. instantiate the Magnetar instance with the store plugins
// -----------------------------------------------------
export const magnetar = Magnetar({
  stores: { local, remote },
  localStoreName: "local",
  executionOrder: {
    read: ["local", "remote"],
    write: ["local", "remote"],
    delete: ["local", "remote"],
  },
});
