<template>
  <!-- <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="modalToggle('cancel')"
          >Cancel</ion-button
        >
      </ion-buttons>
      <ion-title slot="middle">Settings</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="modalToggle('save')" :strong="true"
          >Save</ion-button
        >
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content></ion-content> -->
  <ion-page>
    <base-header title="Search"></base-header>
    <ion-content :fullscreen="true">
      <search-recipes-item></search-recipes-item>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue";

export default {
  components: {
    IonContent,
    IonPage,
  },
  data() {
    return {};
  },

  methods: {
    // modalToggle(state) {
    //   if (state === "save") {
    //     modalController.dismiss(null, "save");
    //   } else if (state === "cancel") {
    //     modalController.dismiss(null, "cancel");
    //   }
    // },
  },
};
</script>
