<template>
  <ion-content>
    <form class="recipeForm" @submit.prevent="submitRecipe">
      <ion-item class="roundedTop">
        <ion-label position="floating">Name:</ion-label>
        <ion-input
          type="text"
          id="name"
          required
          :value="name.val"
          @ionInput="name.val = $event.target.value"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Photo:</ion-label>
        <ion-input
          type="none"
          id="photo"
          :value="photo.val"
          @ionInput="photo.val = $event.target.value"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Time:</ion-label>
        <ion-input
          type="text"
          id="time"
          required
          :value="time.val"
          @ionInput="time.val = $event.target.value"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Servings:</ion-label>
        <ion-select
          placeholder="How many servings?"
          interface="action-sheet"
          required
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
        <ion-label position="floating">Category:</ion-label>
        <ion-select
          placeholder="Which category does this recipe belong to?"
          interface="action-sheet"
          required
          :value="category.val"
          @ionChange="category.val = $event.target.value"
        >
          <ion-select-option value="Appetizers">Appetizers</ion-select-option>
          <ion-select-option value="Breakfast">Breakfast</ion-select-option>
          <ion-select-option value="Brunch">Brunch</ion-select-option>
          <ion-select-option value="Dessert">Dessert</ion-select-option>
          <ion-select-option value="Dinner">Dinner</ion-select-option>
          <ion-select-option value="Drinks">Drinks</ion-select-option>
          <ion-select-option value="Lunch">Lunch</ion-select-option>
          <ion-select-option value="Sides">Sides</ion-select-option>
          <ion-select-option value="Snacks">Snacks</ion-select-option>
          <ion-select-option value="Soups">Soups</ion-select-option>
          <ion-select-option value="Vegan">Vegan</ion-select-option>
          <ion-select-option value="Vegetarian">Vegetarian</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Ingredients:</ion-label>
        <ion-input
          type="text"
          id="ingredients"
          required
          :value="ingredients.val"
          @ionInput="ingredients.val = $event.target.value"
        ></ion-input>
      </ion-item>

      <ion-item class="roundedBottom">
        <ion-label position="floating">Instructions:</ion-label>
        <ion-textarea
          type="text"
          id="instructions"
          :auto-grow="true"
          required
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
  toastController,
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
      category: {
        val: [],
      },
      ingredients: {
        val: [],
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
    async submitRecipe() {
      const recipeForm = {
        name: this.name.val,
        photo: this.photo.val,
        time: this.time.val,
        servings: this.servings.val,
        category: this.category.val,
        ingredients: this.ingredients.val,
        instructions: this.instructions.val,
      };
      this.$emit("save-recipe", recipeForm);
      this.presentToast("middle");
    },

    async presentToast(position) {
      const toast = await toastController.create({
        message: "Recipe Added!",
        duration: 1500,
        position: position,
      });
      await toast.present();
    },
  },
};
</script>

<style scoped>
.roundedTop {
  border-radius: 15px 15px 0px 0px;
}
.roundedBottom {
  border-radius: 0px 0px 15px 15px;
}
.recipeForm {
  padding: 10px;
}
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
