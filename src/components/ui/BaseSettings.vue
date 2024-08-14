<template>
  <ion-content>
    <ion-item button :detail="false" @click="openSettings">Configure</ion-item>
    <ion-item>
      <ion-toggle v-model="themeToggle" @click="toggleTheme"
        >Toggle Theme</ion-toggle
      >
    </ion-item>
    <ion-item>
      <ion-toggle
        :enable-on-off-labels="true"
        v-model="wakeLockEnabled"
        @ionChange="toggleWakeLock"
      >
        Screen Lock</ion-toggle
      >
    </ion-item>
    <ion-item button :detail="false" @click="logout">Logout</ion-item>
  </ion-content>
</template>

<script>
import { IonContent, IonItem, IonToggle } from "@ionic/vue";

export default {
  name: "BaseSettings",
  components: {
    IonContent,
    IonItem,
    IonToggle,
  },
  data() {
    return {
      themeToggle: false,
      wakeLockEnabled: false,
      wakeLock: null,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.replace("/login");
    },
    toggleTheme(event) {
      const isDarkMode = event.detail.checked;
      this.themeToggle = isDarkMode;
      document.body.classList.toggle("dark", isDarkMode);

      if (!isDarkMode) {
        document.body.classList.remove("dark");
      }

      localStorage.setItem("isDarkMode", isDarkMode);
    },

    async openSettings() {
      this.$router.push("/user-settings");
    },
    toggleWakeLock() {
      if (this.wakeLockEnabled) {
        this.activateWakeLock();
      } else {
        this.releaseWakeLock();
      }
    },
    activateWakeLock() {
      if ("wakeLock" in navigator) {
        navigator.wakeLock
          .request("screen")
          .then((wakeLock) => {
            console.log("Wake Lock active");
            // You can store the wake lock in a component data property or Vuex store for later release.
            this.wakeLock = wakeLock;
          })
          .catch((error) => {
            console.error("Unable to acquire wake lock:", error);
          });
      } else {
        console.warn("Wake Lock API not supported");
      }
    },
    releaseWakeLock() {
      if (this.wakeLock) {
        this.wakeLock
          .release()
          .then(() => {
            console.log("Wake Lock released");
            // Reset the wake lock property to null or perform any additional cleanup.
            this.wakeLock = null;
          })
          .catch((error) => {
            console.error("Unable to release wake lock:", error);
          });
      }
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
