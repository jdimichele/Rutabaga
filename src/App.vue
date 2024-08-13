<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import {auth} from "./firebase.js";
import { IonApp, IonRouterOutlet } from "@ionic/vue";

export default {
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  methods: {
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.$store.commit("auth/updateUser", user);
      if (user) {
        this.$store.dispatch("auth/getCurrentUser");
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
