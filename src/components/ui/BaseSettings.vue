<template>
  <ion-content>
    <ion-item button :detail="false" @click="logout">Logout</ion-item>
  </ion-content>
</template>

<script>
import { IonContent, IonItem } from "@ionic/vue";

export default {
  name: "BaseSettings",
  components: {
    IonContent,
    IonItem,
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/auth");
    },
  },
};
</script>
