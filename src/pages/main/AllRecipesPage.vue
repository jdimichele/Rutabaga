<template>
  <ion-page>
    <base-header title="All Recipes"></base-header>
    <ion-content></ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
  },
});
</script>
