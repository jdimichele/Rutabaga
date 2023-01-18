<template>
  <ion-page>
    <div class="background">
      <base-logo></base-logo>
      <ion-card>
        <div>
          <h3>Now with extra salt! Sign in below to get started.</h3>
          <p>
            Don't have an account?
            <router-link to="/register">Register here.</router-link>
          </p>
          <div>
            <form class="" @submit.prevent="login" v-on:keyup.enter="login">
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
              <div class="error" v-show="error">{{ this.errorMessage }}</div>
              <ion-button type="submit">Sign In</ion-button>
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
.background {
  background-image: url(../../../public/assets/background.png);
  height: 100%;
}
ion-card {
  display: flex;
  justify-content: center;
}
ion-button {
  display: flex;
  width: 200px;
  align-self: center;
  margin: 30px;
  --background: theme("colors.rut-generic-mauve");
}
</style>
