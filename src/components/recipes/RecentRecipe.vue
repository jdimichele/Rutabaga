<template>
  <ion-card>
    <img />
    <ion-card-header>
      <ion-card-title> {{ }} </ion-card-title>
    </ion-card-header>
    <ion-card-content> </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
} from "@ionic/vue";

export default {
  components: {
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
  },
};
</script>
