<template>
  <ion-page>
    <base-header title="Search"></base-header>
    <ion-content :fullscreen="true"></ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import BaseHeader from "../../components/ui/BaseHeader.vue";

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    BaseHeader,
  },
});
</script>
