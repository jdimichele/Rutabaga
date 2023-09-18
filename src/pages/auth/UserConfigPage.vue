<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Modal</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm" :strong="true">Save</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>cum</ion-content>
</template>

<script>
import {
  IonContent,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  modalController,
} from "@ionic/vue";

export default {
  components: { IonContent, IonToolbar, IonButtons, IonButton, IonTitle },

  methods: {
    cancel() {
      if (this.modalState === "cancel") {
        modalController.dismiss(null, "cancel");
      }
    },
    save() {
      if (this.modalState === "save") {
        modalController.dismiss("save");
      }
    },
  },
};
</script>
