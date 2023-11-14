<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="modalToggle('cancel')"
          >Cancel</ion-button
        >
      </ion-buttons>
      <ion-title>Modal</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="modalToggle('save')" :strong="true"
          >Save</ion-button
        >
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>List of Courses here!</ion-content>
</template>

<script>
import {
  IonContent,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonHeader,
  modalController,
} from "@ionic/vue";

export default {
  components: {
    IonContent,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonHeader,
  },
  data() {
    return {};
  },

  methods: {
    modalToggle(state) {
      if (state === "save") {
        modalController.dismiss(null, "save");
      } else if (state === "cancel") {
        modalController.dismiss(null, "cancel");
      }
    },
  },
};
</script>
