<template>
  <ion-card>
    <ion-list>
      <ion-item>
        <ion-text>
          <h6>{{ name }}</h6>
        </ion-text>
      </ion-item>
      <ion-item>
        <ion-text>
          <h6>{{ photo }}</h6>
        </ion-text>
      </ion-item>
      <ion-item>
        <ion-text>
          <h6>{{ time }} minutes</h6>
        </ion-text>
      </ion-item>
      <ion-item>
        <ion-text>
          <h6>{{ servings }} servings</h6>
        </ion-text>
      </ion-item>
      <ion-item>
        <ion-text>
          <h6>{{ ingredients }}</h6>
        </ion-text>
      </ion-item>
      <ion-item>
        <ion-text>
          <h6>{{ instructions }}</h6>
        </ion-text>
      </ion-item>
    </ion-list>
  </ion-card>
</template>

<script>
import { IonList, IonText, IonItem, IonCard } from "@ionic/vue";
export default {
  components: {
    IonList,
    IonText,
    IonItem,
    IonCard,
  },
  props: [
    "id",
    "name",
    "photo",
    "time",
    "servings",
    "ingredients",
    "instructions",
  ],
};
</script>
