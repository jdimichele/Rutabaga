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
      <ion-label position="stacked">Servings:</ion-label>
      <ion-select placeholder="How many servings?">
        <ion-select-option value="1">1</ion-select-option>
        <ion-select-option value="2">2</ion-select-option>
        <ion-select-option value="3">3</ion-select-option>
        <ion-select-option value="4">4</ion-select-option>
        <ion-select-option value="5">5</ion-select-option>
        <ion-select-option value="6">6</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-label>Ingredients:</ion-label>
    <ion-item>
      <ion-input type="text" id="title"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Instructions:</ion-label>
      <ion-textarea id="instructions"></ion-textarea>
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
