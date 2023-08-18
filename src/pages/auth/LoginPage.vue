<template>
  <ion-page class="loginPage">
    <div class="loginContainer">
      <div class="logo">
        <base-logo></base-logo>
      </div>
      <ion-card class=" m-auto items-center p-7">
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
            <ion-button class="loginButton" type="submit">Sign In</ion-button>
          </form>
        </div>
      </ion-card>
    </div>
  </ion-page>
</template>

<script>
import { IonPage, IonCard, IonInput, IonButton } from "@ionic/vue";
import BaseLogo from "../../components/ui/BaseLogo.vue";

export default {
  components: {
    IonPage,
    IonButton,
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
.loginPage {
  background-image: url(../../../public/assets/background.png);
  height: 100%;
}
.loginContainer {
  display: grid;
  place-content: center;
}

.loginButton {
  margin: 30px;
  width: 200px;
  --background: #7a3750;
}
ion-input.custom {
  --highlight-color-focused: #7a3750;
}
</style>
