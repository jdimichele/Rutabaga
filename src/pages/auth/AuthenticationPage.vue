<template>
  <ion-page>
    <base-card>
      <ion-img class="logo" src="../../assets/icon/icon.png"></ion-img>
      <ion-title size="large">Rutabaga</ion-title>
      <div class="loginForm">
        <form @submit.prevent="submitForm">
          <div class="form-control">
            <ion-label for="email">Email:</ion-label>
            <ion-input type="email" id="email" v-model.trim="email"></ion-input>
            <ion-label for="password">Password:</ion-label>
            <ion-input
              type="password"
              id="password"
              v-model.trim="password"
            ></ion-input>
          </div>
          <p v-if="!formIsValid">Please enter a valid email and password.</p>
          <ion-button type="submit">{{
            submitButton
          }}</ion-button>
          <ion-button @click="switchAuthMode">{{
            switchButtonCaption
          }}</ion-button>
        </form>
      </div>
    </base-card>
  </ion-page>
</template>

<script>
import {
  IonTitle,
  IonImg,
  IonButton,
  IonInput,
  IonLabel,
  IonPage,
} from "@ionic/vue";

export default {
  components: {
    IonTitle,
    IonImg,
    IonButton,
    IonInput,
    IonLabel,
    IonPage,
  },
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButton() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Create an Account";
      }
    },
    switchButtonCaption() {
      if (this.mode === "login") {
        return "Register";
      } else {
        return "Login Instead";
      }
    },
  },

  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", actionPayload);
        } else {
          await this.$store.dispatch("signup", actionPayload);
        }
        const redirectUrl = "/" + (this.$route.query.redirect || "recipes");
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || "Failed to authenticate, try later.";
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.loginForm {
  padding: 70px 0;
  display: flex;
  justify-content: center;
  align-content: center;
}

.form-control {
  margin: 0.5rem 0;
  text-align: left;
}
ion-title {
  margin-top: 100px;
  margin-bottom: 100px;
  font-size: 50px;
  text-align: center;
  --color: white;
}
.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 300px;
  width: 300px;
  margin-top: 100px;
}

ion-button {
  display: flex;
  width: 200px;
  justify-content: center;
  align-items: center;
}
</style>
