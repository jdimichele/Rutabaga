<template>
  <ion-header>
    <ion-toolbar class="toolbar">
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <base-settings></base-settings>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from "@ionic/vue";
import { settingsOutline } from "ionicons/icons";

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons
  },
  props: ["title"],

  setup() {
    return {
      settingsOutline,
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.settings {
  margin-left: 10px;
}
</style>
