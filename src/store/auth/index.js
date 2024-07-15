import { db, auth } from "../../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
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
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit("setUser", response.user);
        router.push("/recipes");
      } else {
        throw new Error("Login Failed.");
      }
    },
    async getCurrentUser({ commit }) {
      const dataBase = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(dataBase);
      if (userDoc.exists()) {
        commit("setProfileInfo", userDoc);
      } else {
        console.error("User not found.");
      }
    },
    async logout(context) {
      await signOut(auth);
      context.commit("setUser", null);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
