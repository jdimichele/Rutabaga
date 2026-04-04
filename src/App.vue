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

  data() {
    return {
      inactivityTimer: null,
      TIMEOUT_DURATION: 60 * 60 * 1000,
    };
  },

  methods: {
  applyTheme(isDark) {
    document.documentElement.classList.toggle("dark", isDark);
  },

  startInactivityTimer() {
    this.clearInactivityTimer();
    this.inactivityTimer = setTimeout(() => {
      this.handleInactivityLogout();
    }, this.TIMEOUT_DURATION);
  },

  resetInactivityTimer() {
    if (this.$store.state.auth.user.loggedIn) {
      localStorage.setItem("lastActivity", Date.now());
      this.startInactivityTimer();
    }
  },

  clearInactivityTimer() {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }
  },

  async handleInactivityLogout() {
    const wakeLockEnabled = localStorage.getItem("wakeLockEnabled") === "true";
    if (wakeLockEnabled) {
      this.startInactivityTimer();
      return;
    }
    await this.$store.dispatch("auth/logout");
    this.$router.replace("/login");
  },
},

  created() {
    const isDark = localStorage.getItem("isDarkMode") !== "false";
    this.applyTheme(isDark);

    auth.onAuthStateChanged((user) => {
      if (user) {
        const lastActivity = localStorage.getItem("lastActivity");
        const TIMEOUT_DURATION = 30 * 60 * 1000;

        if (lastActivity && Date.now() - lastActivity > TIMEOUT_DURATION) {
          this.$store.dispatch("auth/logout");
          this.$router.replace("/login");
          return;
        }
      }

      this.$store.commit("auth/setUser", user);
      this.$store.commit("auth/setLoggedIn", !!user);

      if (user && !this.$store.state.auth.profileId) {
        this.$store.dispatch("auth/getCurrentUser");
      }

      if (user) {
        this.startInactivityTimer();
      } else {
        this.clearInactivityTimer();
      }
    });

    // Track user activity
    const activityEvents = [
      "mousemove",
      "keydown",
      "click",
      "touchstart",
      "scroll",
    ];
    activityEvents.forEach((event) => {
      window.addEventListener(event, this.resetInactivityTimer, {
        passive: true,
      });
    });
  },

  beforeUnmount() {
    const activityEvents = [
      "mousemove",
      "keydown",
      "click",
      "touchstart",
      "scroll",
    ];
    activityEvents.forEach((event) => {
      window.removeEventListener(event, this.resetInactivityTimer);
    });
    this.clearInactivityTimer();
  },

  beforeUnmount() {
    const activityEvents = [
      "mousemove",
      "keydown",
      "click",
      "touchstart",
      "scroll",
    ];
    activityEvents.forEach((event) => {
      window.removeEventListener(event, this.resetInactivityTimer);
    });
    this.clearInactivityTimer();
  },
};
</script>
