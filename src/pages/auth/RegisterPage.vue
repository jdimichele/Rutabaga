<template>
  <ion-page>
    <div class="background">
      <base-logo></base-logo>
      <ion-card>
        <div>
          <p>
            Already have an account?
            <router-link to="/login">Login here.</router-link>
          </p>
          <div class="register-form-wrapper">
            <form
              @submit.prevent="register"
              v-on:keyup.enter="register"
              class="register-form"
            >
              <div class="inputs">
                <ion-item>
                  <ion-label for="text" position="floating"
                    >First Name:</ion-label
                  >
                  <ion-input
                    type="text"
                    id="firstName"
                    v-model.trim="firstName"
                    placeholder="George"
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label for="text" position="floating"
                    >Last Name:</ion-label
                  >
                  <ion-input
                    type="text"
                    id="lastName"
                    v-model.trim="lastName"
                    placeholder="Google"
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label for="username" position="floating"
                    >Username:</ion-label
                  >
                  <ion-input
                    type="text"
                    id="username"
                    v-model="username"
                    placeholder="TheOGGoogle"
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label for="email" position="floating">Email:</ion-label>
                  <ion-input
                    type="email"
                    id="email"
                    v-model="email"
                    placeholder="george@google.com"
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label for="password" position="floating"
                    >Password:</ion-label
                  >
                  <ion-input
                    type="password"
                    id="password"
                    v-model="password"
                    placeholder="******"
                  ></ion-input>
                </ion-item>
              </div>
              <div class="error" v-show="error">{{ this.errorMessage }}</div>
              <ion-button type="submit">Register</ion-button>
            </form>
          </div>
        </div>
      </ion-card>
    </div>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonItem,
  IonCard,
  IonInput,
  IonLabel,
  IonButton,
} from "@ionic/vue";
import BaseLogo from "../../components/ui/BaseLogo.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { db } from "../../firebase.js";

export default {
  components: {
    IonPage,
    IonItem,
    IonButton,
    IonCard,
    IonLabel,
    IonInput,
    BaseLogo,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      isLoading: false,
      error: null,
      errorMessage: "",
    };
  },
  methods: {
    async register() {
      if (
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.username !== "" &&
        this.email !== "" &&
        this.password !== ""
      ) {
        this.error = false;
        this.errorMessage = "";

        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const result = await createUser;
        const dataBase = db.collection("users").doc(result.user.uid);

        await dataBase.set({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
        });

        this.$router.push("/recipes");

        return;
      }
      this.error = true;
      this.errorMessage = "Please fill out all fields before submitting.";
    },
  },
};
</script>

<style scoped>
.background {
  background-image: url(../../../public/assets/background.png);
  height: 100vh;
}
.register-form {
  padding: 70px 0;
  display: flex;
  flex-flow: column;
}

ion-button {
  display: flex;
  width: 200px;
  justify-content: center;
  align-items: center;
  margin: 30px;
}
</style>
