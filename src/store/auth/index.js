import { db, auth } from "../../firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
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
    async logout(context) {
      await signOut(auth);
      context.commit("setUser", null);
    },

    async register(_, { firstName, lastName, username, email, password }) {
      // Checking for duplicate names here.
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        throw new Error("Oops, looks like this username is already taken!");
      }

      // Now actually registering.
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        username,
        email,
      });

      router.push("/recipes");
    },

    async login({ commit }, payload) {
      if (!payload || !payload.identifier || !payload.password) {
        throw new Error("Both identifier and password are required.");
      }

      try {
        let email = payload.identifier;

        // If not an email, treat as username and look up
        if (!email.includes("@")) {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("username", "==", email));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            throw new Error("Username not found.");
          }

          email = querySnapshot.docs[0].data().email;
        }

        const response = await signInWithEmailAndPassword(
          auth,
          email,
          payload.password
        );

        if (response) {
          commit("setUser", response.user);
          router.push("/recipes");
        }
      } catch (error) {
        console.error("Login failed:", error.message);
        throw error;
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
  },

  getters: {
    user(state) {
      return state.user;
    },
  },
};
