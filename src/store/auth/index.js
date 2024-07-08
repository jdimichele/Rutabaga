import { doc } from "firebase/firestore";
import { db, auth } from "../../firebase.js";
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
      const response = await auth().signInWithEmailAndPassword(email, password);
      if (response) {
        context.commit("setUser", response.user);
        router.push("/recipes");
      } else {
        throw new Error("Login Failed.");
      }
    },
    async getCurrentUser({ commit }) {
      const dataBase = await doc(db, "users" + auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
    },
    async logout(context) {
      auth().signOut;
      context.commit("setUser", null);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
