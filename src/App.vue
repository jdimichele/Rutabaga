<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { auth } from "./firebase.js";
import { IonApp, IonRouterOutlet } from "@ionic/vue";

export default {
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  methods: {},
  created() {
    const isDark = localStorage.getItem("isDarkMode") === "true";
    document.body.classList.toggle("dark", isDark);
    
    auth.onAuthStateChanged((user) => {
      this.$store.commit("auth/setUser", user);
      this.$store.commit("auth/setLoggedIn", !!user);
      if (user && !this.$store.state.auth.profileId) {
        this.$store.dispatch("auth/getCurrentUser");
      }
    });
  },
};
</script>
