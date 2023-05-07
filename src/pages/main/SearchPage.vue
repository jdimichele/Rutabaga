<template>
  <ion-page>
    <base-header title="Search"></base-header>
    <ion-content :fullscreen="true">
      <ion-searchbar class="py-10" mode="ios" placeholder="Time to find that perfect recipe..."></ion-searchbar>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonSearchbar } from "@ionic/vue";
import BaseHeader from "../../components/ui/BaseHeader.vue";

export default {
  components: {
    IonContent,
    IonPage,
    IonSearchbar,
    BaseHeader,
  },
};
</script>
