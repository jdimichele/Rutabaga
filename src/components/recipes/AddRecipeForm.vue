<template>
  <ion-content>
    <ion-grid>
      <form class="md:p-10" @submit.prevent="submitRecipe">
        <ion-row>
          <ion-col>
            <ion-item class="rounded-t-lg">
              <ion-button
                class="photoButton"
                @click.prevent="takePicture"
                v-model="photo"
              >
                <ion-icon :icon="cameraOutline"></ion-icon>
              </ion-button>
              <!-- <div v-else>
                {{ this.newImage }}
              </div> 
            
                            v-if="!photo"-->
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="floating">Name:</ion-label>
              <ion-input
                type="text"
                id="name"
                required
                v-model="name"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Time:</ion-label>
              <ion-input
                placeholder="25 minutes"
                type="text"
                id="time"
                required
                v-model="time"
              ></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
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
                <ion-select-option value="Appetizers"
                  >Appetizers</ion-select-option
                >
                <ion-select-option value="Breakfast"
                  >Breakfast</ion-select-option
                >
                <ion-select-option value="Brunch">Brunch</ion-select-option>
                <ion-select-option value="Dessert">Dessert</ion-select-option>
                <ion-select-option value="Dinner">Dinner</ion-select-option>
                <ion-select-option value="Drinks">Drinks</ion-select-option>
                <ion-select-option value="Lunch">Lunch</ion-select-option>
                <ion-select-option value="Sides">Sides</ion-select-option>
                <ion-select-option value="Snacks">Snacks</ion-select-option>
                <ion-select-option value="Soups">Soups</ion-select-option>
                <ion-select-option value="Vegan">Vegan</ion-select-option>
                <ion-select-option value="Vegetarian"
                  >Vegetarian</ion-select-option
                >
              </ion-select>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-item lines="none">
              <ion-label position="stacked" class="py-1"
                >Ingredients:</ion-label
              >
              <div class="py-2 md:py-3">
                <ion-list
                  v-for="(ingredient, index) in ingredients"
                  :key="index"
                  class="md:flex md:items-stretch"
                >
                  <ion-item class="md:mx-2">
                    <ion-input
                      placeholder="Quantity"
                      type="text"
                      id="ingredients"
                      required
                      v-model="ingredient.qty"
                    >
                    </ion-input>
                  </ion-item>

                  <ion-item class="md:mx-2">
                    <ion-select
                      placeholder="Unit of Measurement"
                      interface="action-sheet"
                      v-model="ingredient.unit"
                    >
                      <ion-select-option value="tsp">tsp</ion-select-option>
                      <ion-select-option value="Tbsp">Tbsp</ion-select-option>
                      <ion-select-option value="g">g</ion-select-option>
                      <ion-select-option value="oz">oz</ion-select-option>
                      <ion-select-option value="cup">cup</ion-select-option>
                      <ion-select-option value="gal">gal</ion-select-option>
                      <ion-select-option value="lbs">lbs</ion-select-option>
                    </ion-select>
                  </ion-item>

                  <ion-item class="md:mx-2">
                    <ion-input
                      placeholder="Name"
                      type="text"
                      id="ingredients"
                      required
                      v-model="ingredient.name"
                    >
                    </ion-input>
                  </ion-item>
                  <ion-item lines="none">
                    <button @click.prevent="addNewIngredient(ingredient)">
                      <ion-icon :icon="addCircleOutline"></ion-icon>
                    </button>
                  </ion-item>
                </ion-list>
              </div>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-item class="rounded-b-lg">
              <ion-label position="stacked" class="py-1"
                >Instructions:</ion-label
              >
              <div class="py-1">
                <ion-list
                  class="flex sm:items-stretch"
                  v-for="(step, index) in instructions"
                  :key="index"
                >
                  <ion-item class="mx-2">
                    <ion-input
                      class="px-1"
                      type="text"
                      id="ingredients"
                      required
                      v-model="step.instruction"
                    >
                    </ion-input>
                  </ion-item>
                  <ion-item lines="none">
                    <button @click.prevent="addNewStep(step)">
                      <ion-icon :icon="addCircleOutline"></ion-icon>
                    </button>
                  </ion-item>
                </ion-list>
              </div>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-fab vertical="bottom" horizontal="center" slot="fixed">
          <ion-button class="submitButton" type="submit">
            <ion-icon :icon="add"></ion-icon>
          </ion-button>
        </ion-fab>
      </form>
    </ion-grid>
  </ion-content>
</template>

<script>
import {
  IonItem,
  IonLabel,
  IonInput,
  IonFab,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonContent,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  toastController,
} from "@ionic/vue";
import { add, addCircleOutline, cameraOutline } from "ionicons/icons";
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
    IonInput,
    IonFab,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonContent,
    IonList,
    IonGrid,
    IonRow,
    IonCol,
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
      instructions: [
        {
          instruction: "",
        },
      ],
    };
  },
  // Possible future idea: IF the quantity is more than 1, we add an 's' to the end of the unit.
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
      setTimeout(() => this.$router.push("/recipes"), 1700);
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
    addNewStep() {
      this.instructions.push({});
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
      cameraOutline,
      addCircleOutline,
    };
  },
};
</script>

<style scoped>
ion-grid {
  --ion-grid-column-padding: 0px;
}

.submitButton {
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
  --background: #7a3750;
}
.photoButton {
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
  margin-left: auto;
  margin-right: auto;
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
  --background: #7a3750;
}

ion-icon {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  --background: #7a3750;
}
</style>
