<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title> Welcome to Rutabaga! </ion-card-title>
          <ion-card-subtitle> Sign In/Sign Up </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <form
            @submit.prevent="
              mode === sOptions
                ? logInWithEmailAndPassword(email, password)
                : signUpWithEmailAndPassword(email, password)
            "
          >
            <ion-item v-if="mode === sOptions">
              <ion-label position="floating">Name:</ion-label>
              <ion-input v-model="name"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Email:</ion-label>
              <ion-input v-model="email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password:</ion-label>
              <ion-input v-model="password" type="password"></ion-input>
            </ion-item>
            <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
              >{{ mode === sOptions ? "Log-In" : "Sign Up" }}
            </ion-button>
            <ion-button
              expand="block"
              color="secondary"
              class="ion-margin-top"
              @click="mode = mode === sOptions ? signUpWithEmailAndPassword : logInWithEmailAndPassword"
              >{{ mode === sOptions ? "Sign Up" : "Cancel" }}
            </ion-button>
          </form>
        </ion-card-content>
        <ion-card-content v-if="errorMsg" class="error-message"> {{ errorMsg }} </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
} from "@ionic/vue";

import { auth } from "../main"; //db
import { reactive, toRefs } from "vue";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "@firebase/auth";
import router from '../router';

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonButton,
    IonLabel,
    IonItem,
  },

  setup() {
    router();
    const sOptions = ({
        logInWithEmailAndPassword,
        signUpWithEmailAndPassword
    });
    const state = reactive({
      name: "",
      email: "",
      password: "",
      errorMsg: "",
      mode: sOptions,
    });

    // const signInWithEmailAndPassword = async (email, password) => {
    //   try {
    //     if (!email || !password) {
    //       state.errorMsg = "Email and password are required!";
    //       return;
    //     }

    //     await auth.signInWithEmailAndPassword(email, password);
    //     router.push("/pages/home");
    //   } catch (error) {
    //     state.errorMsg = error.message;
    //   }
    // };

    const logInWithEmailAndPassword = getAuth();
    signInWithEmailAndPassword(auth, state.email, state.password).then((userCredential) => {
        const user = userCredential.user;
        user.displayName = state.name;
        authState.name;
        router.push("/pages/home");
    })
    .catch((error) => {
        state.errorMsg = error.message;
    });

    // const signUpWithEmailAndPassword = async (name, email, password) => {
    //   try {
    //     if (!name || !email || !password) {
    //       state.errorMsg = "Name, email, and password are required!";
    //       return;
    //     }

    //     const authRes = await auth.createUserWithEmailAndPassword(
    //       email,
    //       password
    //     );

    //     db.collection("users").doc(authRes.user?.uid).set({
    //       name,
    //       email,
    //     });

    //     router.push("/pages/home");
    //   } catch (error) {
    //     state.errorMsg = error.message;
    //   }
    // };

    const signUpWithEmailAndPassword = getAuth();
    createUserWithEmailAndPassword(auth, state.email, state.password).then((userCredential) => {
        const user = userCredential.user;
        user.displayName = state.name;
    })
    .catch((error) => {
        state.errorMsg = error.message;
    });

    const authState = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(uid);
        } else {
            console.log("The fuck is this?");
        }
    })

    return {
      ...toRefs(state),
      logInWithEmailAndPassword,
      signUpWithEmailAndPassword
    };
  },
};
</script>

<style>
.center {
  display: flex;
  height: 90vh;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.error-message {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
  text-align: center;
}
</style>
