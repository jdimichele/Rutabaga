<template>
  <ion-page
    class="h-full bg-login-page bg-auto sm:bg-cover md:bg-contain lg:bg-auto xl:bg-cover"
  >
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
                label="Username:"
                label-placement="floating"
                type="username"
                id="username"
                v-model="emailOrUsername"
                placeholder="BigFanOfBaking28"
                class="text-white"
                style="--highlight-color-focused: #7a3750"
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
                class="text-white"
                style="--highlight-color-focused: #7a3750"
                mode="md"
              ></ion-input>
            </div>
            <button
              class="m-8 w-52 h-10 rounded-lg bg-rut-generic-mauve text-lg text-white font-bold"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </ion-card>
      <div
        class="text-center text-red-600 font-medium mt-3"
        v-show="errorMessage"
      >
        {{ errorMessage }}
      </div>
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
      emailOrUsername: "",
      password: "",
      errorMessage: "",
      error: false,
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("auth/login", {
          identifier: this.emailOrUsername,
          password: this.password,
        });

        await this.$store.dispatch("auth/getCurrentUser");

        this.$router.push("/recipes");
      } catch (error) {
        this.error = true;
        this.errorMessage = error.message || "Login failed, please try again.";
        console.error("Login error:", error);
      }
    },
  },
};
</script>
