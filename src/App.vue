<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<<<<<<< HEAD
<script>
import firebase from "firebase/app";
import "firebase/auth";
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
    firebase.auth().onAuthStateChanged((user) => {
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
=======
<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
>>>>>>> b35fc98 (Initial commit)
</script>
