<template>
  <base-card>
    <ion-title class="title">Categories:</ion-title>
    <ion-accordion-group :multiple="true">
      <ion-accordion>
        <ion-item slot="header">
          <ion-label>Appetizers</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">Popcorn</div>
      </ion-accordion>
      <ion-accordion>
        <ion-item slot="header">
          <ion-label>Breakfast</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">More Popcorn!</div>
      </ion-accordion>
      <ion-accordion>
        <ion-item slot="header">
          <ion-label>Brunch</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">EVEN MORE Popcorn!</div>
      </ion-accordion>
    </ion-accordion-group>
  </base-card>
</template>

<script>
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonTitle,
} from "@ionic/vue";
export default {
  components: {
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonTitle,
  },
};
</script>

<style scoped>
.title {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}
</style>
