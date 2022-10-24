<template>
  <ion-content>
    <form @submit.prevent="submitRecipe">
      <ion-item>
        <ion-label position="stacked">Name:</ion-label>
        <ion-input
          type="text"
          id="rname"
          :value="rname.val"
          @ionInput="rname.val = $event.target.value"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Photo:</ion-label>
        <ion-input
          type="none"
          id="photo"
          :value="photo.val"
          @ionInput="photo.val = $event.target.value"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Time:</ion-label>
        <ion-input
          type="numeric"
          id="time"
          :value="time.val"
          @ionInput="time.val = $event.target.value"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Servings:</ion-label>
        <ion-select
          placeholder="How many servings?"
          interface="action-sheet"
          :value="servings.val"
          @ionInput="servings.val = $event.target.value"
        >
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
        <ion-input
          type="text"
          id="ingredients"
          :value="ingredients.val"
          @ionInput="ingredients.val = $event.target.value"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Instructions:</ion-label>
        <ion-textarea
          type="text"
          id="instructions"
          :value="instructions.val"
          @ionInput="instructions.val = $event.target.value"
        ></ion-textarea>
      </ion-item>
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button>
          <ion-button type="submit">
            <ion-icon :icon="add"></ion-icon>
          </ion-button>
        </ion-fab-button>
      </ion-fab>
    </form>
  </ion-content>
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
  IonButton,
  IonContent,
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
    IonButton,
    IonContent,
  },
  emits: ["save-recipe"],
  data() {
    return {
      rname: {
        val: "",
      },
      photo: {
        val: "",
      },
      time: {
        val: "",
      },
      servings: {
        val: "",
      },
      ingredients: {
        val: "",
      },
      instructions: {
        val: "",
      },
    };
  },
  setup() {
    return {
      add,
    };
  },
  methods: {
    submitRecipe() {
      const recipeForm = {
        rname: this.rname.val,
        photo: this.photo.val,
        time: this.time.val,
        servings: this.servings.val,
        ingredients: this.ingredients.val,
        instructions: this.instructions.val,
      };
      this.$emit("save-recipe", recipeForm);
    },
  },
};
</script>
