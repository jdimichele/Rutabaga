<template>
  <ion-page class="h-full bg-login-page bg-auto sm:bg-cover md:bg-contain lg:bg-auto xl:bg-cover">
    <div class="grid place-content-center">
      <div>
        <base-logo></base-logo>
      </div>
      <ion-card class="justify-items-center">
        <div class="text-center">
          <p>
            Already have an account?
            <router-link to="/login">Login here.</router-link>
          </p>
        </div>
        <div class="pt-2 px-9 pb-0">
          <form @submit.prevent="register" v-on:keyup.enter="register">
            <ion-item>
              <ion-input
                label="First Name:"
                label-placement="floating"
                type="text"
                id="firstName"
                v-model.trim="firstName"
                placeholder="George"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                label="Last Name:"
                label-placement="floating"
                type="text"
                id="lastName"
                v-model.trim="lastName"
                placeholder="Google"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                label="Username:"
                label-placement="floating"
                type="text"
                id="username"
                v-model="username"
                placeholder="TheOGGoogle"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                label="Email:"
                label-placement="floating"
                type="email"
                id="email"
                v-model="email"
                placeholder="george@google.com"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                label="Password:"
                label-placement="floating"
                type="password"
                id="password"
                v-model="password"
                placeholder="******"
              ></ion-input>
            </ion-item>
            <div class="error" v-show="error">{{ this.errorMessage }}</div>
            <button
              class="m-8 w-52 h-10 rounded-lg bg-rut-generic-mauve text-lg text-white font-bold"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </ion-card>
    </div>
  </ion-page>
</template>

<script>
import { IonPage, IonItem, IonCard, IonInput } from "@ionic/vue";
import BaseLogo from "../../components/ui/BaseLogo.vue";
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../../firebase.js";

export default {
  components: {
    IonPage,
    IonItem,
    IonCard,
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
ion-input {
  color: white;
  --highlight-color-focused: #7a3750;
}
</style>
