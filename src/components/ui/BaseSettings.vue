<template>
  <ion-content>
    <ion-item>
      <ion-label>Toggle Theme</ion-label>
      <ion-toggle
        v-model="themeToggle"
        slot="end"
        @click="toggleDarkTheme"
      ></ion-toggle>
    </ion-item>
    <ion-item button :detail="false" @click="logout">Logout</ion-item>
  </ion-content>
</template>

<script>
import { IonContent, IonItem, IonToggle, IonLabel } from "@ionic/vue";

export default {
  name: "BaseSettings",
  components: {
    IonContent,
    IonItem,
    IonToggle,
    IonLabel,
  },
  data() {
    return {
      themeToggle: "dark",
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.replace("/login");
    },
    toggleDarkTheme(event) {
      if (event && this.themeToggle === "dark") {
        var toggle = this.themeToggle;
        toggle = "light";
        document.body.classList.toggle(toggle, event.detail.checked);
      }
      return this.themeToggle;
    },
  },
};

// // Query for the toggle that is used to change between themes
// const toggle = document.querySelector('#themeToggle');

// // Listen for the toggle check/uncheck to toggle the dark class on the <body>
// toggle.addEventListener('ionChange', (ev) => {
//   document.body.classList.toggle('dark', ev.detail.checked);
// });

// const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// // Listen for changes to the prefers-color-scheme media query
// prefersDark.addListener((e) => checkToggle(e.matches));

// // Called when the app loads
// function loadApp() {
//   checkToggle(prefersDark.matches);
// }

// // Called by the media query to check/uncheck the toggle
// function checkToggle(shouldCheck) {
//   toggle.checked = shouldCheck;
// }
</script>
