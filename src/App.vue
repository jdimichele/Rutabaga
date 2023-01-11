<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { IonApp, IonRouterOutlet } from "@ionic/vue";

export default {
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("auth/updateUser", user);
      if (user) {
        this.$store.dispatch("auth/getCurrentUser");
        console.log("After login: " + user.email);
      } else if (!user) {
        this.$router.replace("/login");
        console.log("After logout: " + user.email);
      }
    });
  },
  computed: {
    // didAutoLogout() {
    //   return this.$store.getters.didAutoLogout;
    // },
  },
  watch: {
    // didAutoLogout(curValue, oldValue) {
    //   if (curValue && curValue !== oldValue) {
    //     this.$router.replace("/login");
    //   }
    // },
  },
};
</script>
