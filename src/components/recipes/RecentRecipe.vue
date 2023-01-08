<template>
  <ion-card>
    <div v-if="isLoading">
      <ion-loading></ion-loading>
    </div>

    <div>
      <h2>Recently Viewed:</h2>
      <h2>{{}}</h2>
    </div>
  </ion-card>
</template>

<script>
import { IonCard, IonLoading } from "@ionic/vue";

export default {
  components: { IonCard, IonLoading },
  data() {
    return {
      isLoading: false,
    };
  },
};
</script>
