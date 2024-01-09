<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Courses:</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-input placeholder="Appetizers"></ion-input>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
} from "@ionic/vue";

export default {
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
  },
};
</script>

<style scoped>
ion-input {
  color: white;
  --highlight-color-focused: #7a3750;
}
</style>
