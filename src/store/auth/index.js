<<<<<<< HEAD
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../../firebase.js";
=======
import { doc } from "firebase/firestore";
import { db, auth } from "../../firebase.js";
>>>>>>> 3548129 (Due to Vue's new npm create script and the deprecation of Vue CLI,)
import router from "../../router";

export default {
  namespaced: true,
  state() {
    return {
      user: {
        loggedIn: false,
        data: null,
      },
      profileEmail: null,
      profileFirstName: null,
      profileLastName: null,
      profileUsername: null,
      profileId: null,
      userId: null,
    };
  },
  mutations: {
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setLoggedIn(state, payload) {
      state.user.loggedIn = payload;
    },
    setUser(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    async login(context, { email, password }) {
<<<<<<< HEAD
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
=======
      const response = await auth().signInWithEmailAndPassword(email, password);
>>>>>>> 3548129 (Due to Vue's new npm create script and the deprecation of Vue CLI,)
      if (response) {
        context.commit("setUser", response.user);
        router.push("/recipes");
      } else {
        throw new Error("Login Failed.");
      }
    },
    async getCurrentUser({ commit }) {
<<<<<<< HEAD
      const dataBase = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
=======
      const dataBase = await doc(db, "users" + auth().currentUser.uid);
>>>>>>> 3548129 (Due to Vue's new npm create script and the deprecation of Vue CLI,)
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
    },
    async logout(context) {
<<<<<<< HEAD
      firebase.auth().signOut;
=======
      auth().signOut;
>>>>>>> 3548129 (Due to Vue's new npm create script and the deprecation of Vue CLI,)
      context.commit("setUser", null);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
