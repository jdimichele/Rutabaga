<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Create An Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <div>
      <form @submit.prevent="register">
        <h2>Register</h2>
        <input type="email" placeholder="Email address..." v-model="email" />
        <input type="password" placeholder="password..." v-model="password" />
        <button type="submit">Register</button>
      </form>
    </div>
  </ion-page>
</template>

<script>
import {
  createUserWithEmailAndPassword, getAuth,
} from "@firebase/auth";
const auth = getAuth();
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      createUserWithEmailAndPassword(auth, this.email, this.password).then(() => {
        alert("Successfully registered! Please login.");
        this.$router.push("/recipes");
      }).catch((error) => {
        alert(error.message);
      });
    },
  },
};
</script>
