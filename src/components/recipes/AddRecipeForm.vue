<template>
  <ion-content>
    <form class="recipeForm" @submit.prevent="submitRecipe">
      <ion-item class="roundedTop">
        <ion-label position="floating">Name:</ion-label>
        <ion-input type="text" id="name" required v-model="name"></ion-input>
      </ion-item>

      <!-- Will need to re-write this soon, but currently for testing purposes: -->
      <ion-item class="photoBlock">
        <ion-label position="floating">Photo:</ion-label>
        <ion-button
          class="bigButton"
          @click.prevent="takePicture"
          v-model="photo"
        >
          Test
        </ion-button>
      </ion-item>
      <!-- End of photo testing code. -->

      <ion-item>
        <ion-label position="floating">Time:</ion-label>
        <ion-input type="text" id="time" required v-model="time"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Servings:</ion-label>
        <ion-select
          placeholder="How many servings?"
          interface="action-sheet"
          required
          v-model="servings"
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
          v-model="category"
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
        <ion-label position="stacked">Ingredients:</ion-label>
        <ion-list v-for="(ingredient, index) in ingredients" :key="index">
          <ion-item>
            <ion-input
              type="text"
              id="ingredients"
              required
              v-model="ingredient.qty"
            >
            </ion-input>
            <ion-input
              type="text"
              id="ingredients"
              required
              v-model="ingredient.unit"
            >
            </ion-input>

            <ion-input
              type="text"
              id="ingredients"
              required
              v-model="ingredient.name"
            >
            </ion-input>
            <button @click.prevent="addNewIngredient(ingredient)">+</button>
          </ion-item>
        </ion-list>
      </ion-item>

      <ion-item class="roundedBottom">
        <ion-label position="floating">Instructions:</ion-label>
        <ion-textarea
          type="text"
          id="instructions"
          :auto-grow="true"
          required
          v-model="instructions"
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
  IonList,
  toastController,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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
    IonList,
  },
  emits: ["save-recipe"],
  data() {
    return {
      name: "",
      photo: null,
      time: "",
      servings: "",
      category: "",
      ingredients: [
        {
          qty: "",
          unit: "",
          name: "",
        },
      ],
      instructions: "",
    };
  },
  methods: {
    async submitRecipe() {
      const recipeForm = {
        name: this.name,
        photo: this.photo,
        time: this.time,
        servings: this.servings,
        category: this.category,
        ingredients: this.ingredients,
        instructions: this.instructions,
      };
      this.$emit("save-recipe", recipeForm);
      this.presentToast("middle");
    },

    async takePicture() {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64,
      });
      if (image?.base64String) {
        const userId = firebase.auth().currentUser.uid;
        const guid = uuidv4();
        const filePath = `${userId}/images/${guid}.${image.format}`;

        const storageRef = firebase.storage().ref();
        await storageRef
          .child(filePath)
          .putString(image.base64String, "base64");
        return (this.photo = await storageRef.child(filePath).getDownloadURL());
      }
    },

    addNewIngredient() {
      this.ingredients.push({});
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
  setup() {
    return {
      add,
    };
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
/* .bigButton {
  width: 200px;
  height: 200px;
} */
.recipeForm {
  padding: 10px;
  /* display: grid;
  grid-template-columns: auto; */
}
.photoBlock {
  grid-area: 1 / 3 / span 2 / span 2;
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
