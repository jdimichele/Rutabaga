<template>
  <ion-page class="loginPage">
    <div class="loginContainer">
      <div class="logo">
        <base-logo></base-logo>
      </div>
      <ion-card class="loginCard">
        <div class="loginText">
          <h3>Sign in below to get started.</h3>
          <p>
            Don't have an account?
            <router-link to="/register">Register here.</router-link>
          </p>
        </div>
        <div class="loginForm">
          <form @submit.prevent="login" v-on:keyup.enter="login">
            <ion-item>
              <ion-label for="email" position="floating">Email:</ion-label>
              <ion-input
                class="input"
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
                class="input"
                type="password"
                id="password"
                v-model="password"
                placeholder="******"
              ></ion-input>
            </ion-item>
            <div class="error" v-show="error">{{ this.errorMessage }}</div>
            <ion-button class="loginButton" type="submit">Sign In</ion-button>
          </form>
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
.loginForm {
text-align: center;
}
.loginCard {
  justify-items: center;
  padding: 30px 200px;
}
.loginText {
  text-align: center;
}

.loginButton {
  margin: 30px;
  width: 200px;
  --background: #7a3750;
}
ion-item {
  --highlight-color-focused: #7a3750;
}
</style>
