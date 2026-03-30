import { db, auth } from "../../firebase.js";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  where,
  query,
  limit,
} from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

function getFriendlyError(code) {
  const errors = {
    "auth/invalid-credential": "Incorrect password. Please try again.",
    "auth/invalid-email": "Invalid email address.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found with those credentials.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/too-many-requests":
      "Too many failed attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return errors[code] || "An unexpected error occurred. Please try again.";
}

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

    clearProfileInfo(state) {
      state.profileId = null;
      state.profileEmail = null;
      state.profileFirstName = null;
      state.profileLastName = null;
      state.profileUsername = null;
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
      context.commit("clearProfileInfo");
    },

    async login({ commit, dispatch }, { identifier, password }) {
      if (!identifier?.trim() || !password) {
        throw new Error("Both identifier and password are required.");
      }

      let email = identifier.trim();

      // If the identifier does NOT contain an @, treat it as a username
      if (!email.includes("@")) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", email), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          throw new Error("No account with that username found.");
        }

        const userData = querySnapshot.docs[0].data();

        if (!userData.email) {
          throw new Error(
            "Some account information is incomplete. Please contact support.",
          );
        }

        email = userData.email;
      }

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;
        commit("setUser", user);
        commit("setLoggedIn", true);
        await dispatch("getCurrentUser");
      } catch (err) {
        const friendly = getFriendlyError(err.code);
        const error = new Error(friendly);
        error.originalError = err;
        throw error;
      }
    },

    async getCurrentUser({ commit }) {
      if (!auth.currentUser) {
        console.warn("getCurrentUser called with no authenticated user.");
        return;
      }

      const userRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        commit("setProfileInfo", userDoc);
      } else {
        console.error("User not found for uid: ", auth.currentUser.uid);
      }
    },
  },

  getters: {
    user: (state) => state.user,
    isLoggedIn: (state) => state.user.loggedIn,
    profileUsername: (state) => state.profileUsername,
    profileEmail: (state) => state.profileEmail,
    profileFullName: (state) =>
      [state.profileFirstName, state.profileLastName].filter(Boolean).join(" "),
  },
};
