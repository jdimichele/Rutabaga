<template>
  <ion-page>
    <base-card>
      <ion-title class="title">Rutabaga</ion-title>
      <ion-img src="../../assets/icon/icon.png" ref="rutabaga"></ion-img>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label class="font-bold" for="email">Email:</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">Please enter a valid email and password.</p>
        <button>{{ submitButton }}</button>
        <button @click="switchAuthMode">{{ switchButtonCaption }}</button>
      </form>
    </base-card>
  </ion-page>
</template>

<script>
import { IonTitle, IonImg } from "@ionic/vue";
import gsap from 'gsap';

gsap.to("rutabaga", {
    rotation: 360,
    duration: 1,
    repeat: 1,
    repeatDelay: 1,
});


export default {
  components: {
    IonTitle,
    IonImg,
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
        return "Sign Up";
      }
    },
    switchButtonCaption() {
      if (this.mode === "login") {
        return "Sign Up";
      } else {
        return "Login";
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
form {
  margin: 1rem;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  flex-direction: column;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}
.title {
    justify-content: center;
}
</style>
