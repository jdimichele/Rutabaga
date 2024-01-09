<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Categories:</ion-card-title>
    </ion-card-header>
  </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/vue";

export default {
  components: { IonCard, IonCardHeader, IonCardTitle },
};
</script>

<style scoped>
ion-input {
  color: white;
  --highlight-color-focused: #7a3750;
}
</style>
