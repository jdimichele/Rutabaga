<template>
  <ion-page class="h-full bg-login-page">
    <div class="grid place-content-center">
      <div>
        <base-logo></base-logo>
      </div>
      <ion-card class="m-auto items-center p-7">
        <div class="text-center">
          <h3>Sign in below to get started.</h3>
          <p>
            Don't have an account?
            <router-link to="/register">Register here.</router-link>
          </p>
        </div>
        <div>
          <form @submit.prevent="login" v-on:keyup.enter="login">
            <div>
              <ion-input
                label="Email:"
                label-placement="floating"
                type="email"
                id="email"
                v-model="email"
                placeholder="george@google.com"
                class="custom"
                mode="md"
              ></ion-input>
            </div>
            <div>
              <ion-input
                label="Password:"
                label-placement="floating"
                type="password"
                id="password"
                v-model="password"
                placeholder="******"
                class="custom"
                mode="md"
              ></ion-input>
            </div>
            <div class="error" v-show="error">{{ this.errorMessage }}</div>
            <button
              class="m-8 w-52 h-10 rounded-lg bg-rut-generic-mauve text-lg text-white font-bold"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </ion-card>
    </div>
  </ion-page>
</template>

<script>
import { IonPage, IonCard, IonInput } from "@ionic/vue";
import BaseLogo from "../../components/ui/BaseLogo.vue";

export default {
  components: {
    IonPage,
    IonCard,
    IonInput,
    BaseLogo,
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      error: null,
      errorMessage: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("auth/login", {
        email: this.email,
        password: this.password,
      });
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
