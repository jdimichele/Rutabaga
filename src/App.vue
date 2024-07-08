<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<script>
import firebase from "firebase/app";
import "firebase/auth";
=======
<script>
import {auth} from "./firebase.js";
>>>>>>> 3548129 (Due to Vue's new npm create script and the deprecation of Vue CLI,)
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
<<<<<<< HEAD
    firebase.auth().onAuthStateChanged((user) => {
=======
    auth.onAuthStateChanged((user) => {
>>>>>>> 3548129 (Due to Vue's new npm create script and the deprecation of Vue CLI,)
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
<<<<<<< HEAD
=======
<script setup lang="ts">
=======
<script setup>
>>>>>>> 7d81db9 (Initial commit. Note: Due to Vue CLI being deprecated and constant webpack issues, I've)
import { IonApp, IonRouterOutlet } from '@ionic/vue';
>>>>>>> b35fc98 (Initial commit)
=======
>>>>>>> 3548129 (Due to Vue's new npm create script and the deprecation of Vue CLI,)
</script>
