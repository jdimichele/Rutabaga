import { db, auth } from "../../firebase.js";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

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
    async logout(context) {
      await signOut(auth);
      context.commit("setUser", null);
      context.commit("setLoggedIn", false);
    },

    async login({ commit }, { identifier, password }) {
      if (!identifier || !password) {
        throw new Error("Both identifier and password are required.");
      }

      let email = identifier;

      // If the identifier does NOT contain an @, treat it as a username
      if (!identifier.includes("@")) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", identifier));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          throw new Error("No account found with that username.");
        }

        const userData = querySnapshot.docs[0].data();
        email = userData.email;
      }

      // Now login using Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      commit("setUser", user);
      commit("setLoggedIn", true);
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
  },

  getters: {
    user(state) {
      return state.user;
    },
  },
};
