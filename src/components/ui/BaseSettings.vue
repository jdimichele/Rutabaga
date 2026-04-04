<template>
  <ion-content>
    <ion-item button :detail="false" @click="openSettings">Configure</ion-item>
    <ion-item>
      <ion-label>Toggle Theme</ion-label>
      <ion-toggle
        :check="themeToggle"
        :enable-on-off-labels="true"
        @ionChange="toggleTheme"
      ></ion-toggle>
    </ion-item>
    <ion-item>
      <ion-label>Keep Awake</ion-label>
      <ion-toggle
        :checked="wakeLockEnabled"
        :enable-on-off-labels="true"
        @ionChange="toggleWakeLock"
      ></ion-toggle>
    </ion-item>
    <ion-item button :detail="false" @click="logout">Logout</ion-item>
  </ion-content>
</template>

<script>
import { IonContent, IonItem, IonLabel, IonToggle } from "@ionic/vue";

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
      themeToggle: localStorage.getItem("isDarkMode") === "true",
      wakeLockEnabled: localStorage.getItem("wakeLockEnabled") === "true",
      wakeLock: null,
    };
  },

  mounted() {
    document.body.classList.toggle("dark", this.themeToggle);

    // Keep WakeLock preference on load.
    if (this.wakeLockEnabled) {
      this.activateWakeLock();
    }
    document.addEventListener("visibilitychange", this.handleVisibiltyChange);
  },

  beforeUnmount() {
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibiltyChange,
    );
  },

  methods: {
    logout() {
      this.releaseWakeLock();
      this.$store.dispatch("auth/logout");
      this.$router.replace("/login");
    },

    toggleTheme(event) {
      const isDark = event.detail.checked;
      this.themeToggle = isDark;
      document.body.classList.toggle("dark", isDark);
      localStorage.setItem("isDarkMode", isDark);
    },

    async openSettings() {
      this.$router.push("/user-settings");
    },

    toggleWakeLock(event) {
      this.wakeLockEnabled = event.detail.checked;
      localStorage.setItem("wakeLockEnabled", this.wakeLockEnabled);
      if (this.wakeLockEnabled) {
        this.activateWakeLock();
      } else {
        this.releaseWakeLock();
      }
    },

    async activateWakeLock() {
      if ((!"wakeLock") in navigator) {
        console.warn("Wake Lock API is not support on this device! :(");
        return;
      }
      try {
        this.wakeLock = await navigator.wakeLock.request("screen");
        console.log("Wake Lock now active!");
      } catch (err) {
        console.error("Unable to aquire Wake Lock: ", err);
      }
    },

    async releaseWakeLock() {
      if (this.wakeLock) {
        try {
          await this.wakeLock.release();
          this.wakeLock = null;
          console.log("Wake Lock now disabled!");
        } catch (err) {
          console.error("Unable to release Wake Lock: ", err);
        }
      }
    },

    async handleVisibiltyChange() {
      if(document.visibilityState === "visible" && this.wakeLockEnabled) {
        await this.activateWakeLock();
      }
    }
  },
};
</script>
