<template>
  <ion-content>
    <form @submit.prevent="submitRecipe">
      <ion-item>
        <ion-label position="stacked">Name:</ion-label>
        <ion-input
          type="text"
          id="name"
          :value="name.val"
          @ionInput="name.val = $event.target.value"
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
          @ionChange="servings.val = $event.target.value"
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
        <ion-button type="submit">
          <ion-icon :icon="add"></ion-icon>
        </ion-button>
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
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonContent,
  },
  emits: ["save-recipe"],
  data() {
    return {
      name: {
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
        name: this.name.val,
        photo: this.photo.val,
        time: this.time.val,
        servings: this.servings.val,
        ingredients: this.ingredients.val,
        instructions: this.instructions.val,
      };
      this.$emit("save-recipe", recipeForm);
      this.$router.replace("/recipes");
    },
  },
};
</script>

<style scoped>
ion-button {
  --transition: background-color, opacity 100ms linear;
  --ripple-color: currentColor;
  --border-radius: 50%;
  --border-width: 0;
  --border-style: none;
  --border-color: initial;
  --padding-top: 0;
  --padding-end: 0;
  --padding-bottom: 0;
  --padding-start: 0;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0;
  display: block;
  width: 56px;
  height: 56px;
  position: relative;
  font-size: 14px;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: none;
  white-space: nowrap;
  -webkit-font-kerning: none;
  font-kerning: none;
}
ion-icon {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
