<template>
  <form>
    <ion-item>
      <ion-label>Name:</ion-label>
      <ion-input type="text" id="title"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Photo:</ion-label>
      <ion-input type="text" id="title"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Time:</ion-label>
      <ion-input type="text" id="title"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Servings:</ion-label>
      <ion-input type="text" id="title"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Ingredients:</ion-label>
      <ion-input type="text" id="title"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Instructions:</ion-label>
      <ion-textarea id="instructions"></ion-textarea>
    </ion-item>
  </form>
</template>

<script>
import { IonItem, IonLabel, IonTextarea, IonInput } from "@ionic/vue";
export default {
  components: {
    IonItem,
    IonLabel,
    IonTextarea,
    IonInput,
  },
};
</script>
