<template>
  <form>
    <ion-item>
      <ion-label position="stacked">Name:</ion-label>
      <ion-input type="text" id="title"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Photo:</ion-label>
      <ion-input type="text" id="title"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Time:</ion-label>
      <ion-input type="text" id="title"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="stacked">Servings:</ion-label>
      <ion-select placeholder="How many servings?" interface="action-sheet">
        <ion-select-option value="1">1</ion-select-option>
        <ion-select-option value="2">2</ion-select-option>
        <ion-select-option value="3">3</ion-select-option>
        <ion-select-option value="4">4</ion-select-option>
        <ion-select-option value="5">5</ion-select-option>
        <ion-select-option value="6">6</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Ingredients:</ion-label>
      <ion-input type="text" id="title"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Instructions:</ion-label>
      <ion-textarea type="text" id="instructions"></ion-textarea>
    </ion-item>
  </form>

  <ion-fab vertical="bottom" horizontal="center" slot="fixed">
    <ion-fab-button>
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script>
import {
  IonItem,
  IonLabel,
  IonTextarea,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { add } from "ionicons/icons";

export default {
  components: {
    IonItem,
    IonLabel,
    IonTextarea,
    IonInput,
    IonFab,
    IonFabButton,
    IonIcon,
    IonSelect,
    IonSelectOption,
  },
  setup() {
    return {
      add,
    };
  },
};
</script>
