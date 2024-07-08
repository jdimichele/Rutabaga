<template>
  <ion-header>
    <ion-toolbar class="toolbar">
      <ion-title>{{ title }}</ion-title>
      <ion-back-button default-href="/" slot="start"></ion-back-button>
      <ion-buttons slot="end">
        <ion-button @click="openPopover">
          <ion-icon slot="icon-only" :icon="settingsOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonBackButton,
  IonTitle,
  popoverController,
} from "@ionic/vue";
import { settingsOutline } from "ionicons/icons";
import BaseSettings from "../ui/BaseSettings.vue";

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonBackButton,
  },
  props: ["title"],

  setup() {
    return {
      settingsOutline,
    };
  },
  methods: {
    async openPopover(ev) {
      const popover = await popoverController.create({
        component: BaseSettings,
        event: ev,
        dismissOnSelect: true,
      });
      await popover.present();
    },
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

ion-back-button {
  padding-left: 2px;
}
</style>
