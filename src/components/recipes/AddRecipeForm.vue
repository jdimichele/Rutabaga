<template>
  <div class="m-2">
    <ion-segment value="overview" swipe-gesture="true" mode="ios">
      <ion-segment-button
        @click.prevent="switchToSegment('overview')"
        value="overview"
        type="button"
        >Overview</ion-segment-button
      >
      <ion-segment-button
        @click.prevent="switchToSegment('ingredients')"
        value="ingredients"
        type="button"
        >Ingredients</ion-segment-button
      >
      <ion-segment-button
        @click.prevent="switchToSegment('instructions')"
        value="instructions"
        type="button"
        >Instructions</ion-segment-button
      >
    </ion-segment>
  </div>
  <ion-content>
    <ion-grid>
      <form class="md:p-10" @submit.prevent="submitRecipe">
        <div v-show="this.segment === 'overview'">
          <ion-row>
            <ion-col>
              <ion-item class="rounded-t-lg">
                <ion-icon
                  class="w-full"
                  @click.prevent="takePicture"
                  v-model="photo"
                  :icon="cameraOutline"
                ></ion-icon>
                <!-- 
              At some point in the future, need to display current image user has uploaded using the following:
              <div v-if="!photo"> </div>
              <div v-else>
                {{ this.newImage }}
              </div> 
            -->
              </ion-item>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label position="floating">Name:</ion-label>
                <ion-input
                  placeholder="Gabagool"
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
                <ion-input
                  placeholder="How many servings?"
                  interface="action-sheet"
                  required
                  v-model="servings"
                >
                </ion-input>
              </ion-item>

              <ion-item class="rounded-b-lg">
                <ion-label position="floating">Course:</ion-label>
                <ion-select
                  placeholder="Which course does this recipe belong to?"
                  interface="action-sheet"
                  required
                  v-model="course"
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
                  <ion-select-option value="Dips">Dips</ion-select-option>
                  <ion-select-option value="Dressings"
                    >Dressings</ion-select-option
                  >
                  <ion-select-option value="Drinks">Drinks</ion-select-option>
                  <ion-select-option value="Lunch">Lunch</ion-select-option>
                  <ion-select-option value="Sauces">Sauces</ion-select-option>
                  <ion-select-option value="Sides">Sides</ion-select-option>
                  <ion-select-option value="Snacks">Snacks</ion-select-option>
                  <ion-select-option value="Soups">Soups</ion-select-option>
                  <ion-select-option value="Staples">Staples</ion-select-option>
                  <ion-select-option value="Vegan">Vegan</ion-select-option>
                  <ion-select-option value="Vegetarian"
                    >Vegetarian</ion-select-option
                  >
                </ion-select>
              </ion-item>
            </ion-col>
          </ion-row>
        </div>

        <div v-show="this.segment === 'ingredients'">
          <ion-row>
            <ion-col>
              <ion-item lines="none" class="rounded-lg">
                <ion-label position="stacked" class="py-1"
                  >Ingredients:</ion-label
                >
                <div class="py-2 md:py-3">
                  <ion-list
                    v-for="(ingredient, index) in ingredients"
                    :key="index"
                    class="flex md:flex md:items-stretch"
                  >
                    <ion-item class="md:mx-2">
                      <ion-input
                        class="px-1 w-64"
                        placeholder="1lb Garlic Cloves"
                        type="text"
                        id="ingredients"
                        required
                        v-model="ingredient.detail"
                      >
                      </ion-input>
                    </ion-item>

                    <ion-item lines="none">
                      <button @click.prevent="addNewIngredient(ingredient)">
                        <ion-icon
                          color="success"
                          :icon="addCircleOutline"
                        ></ion-icon>
                      </button>
                    </ion-item>
                    <ion-item lines="none">
                      <button @click.prevent="removeLastIngredient(ingredient)">
                        <ion-icon
                          color="danger"
                          :icon="removeCircleOutline"
                        ></ion-icon>
                      </button>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-item>
            </ion-col>
          </ion-row>
        </div>

        <div v-show="this.segment === 'instructions'">
          <ion-row>
            <ion-col>
              <ion-item class="rounded-lg">
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
                        class="px-1 w-64"
                        type="text"
                        id="ingredients"
                        required
                        v-model="step.instruction"
                      >
                      </ion-input>
                    </ion-item>
                    <ion-item lines="none">
                      <button @click.prevent="addNewStep(step)">
                        <ion-icon
                          color="success"
                          :icon="addCircleOutline"
                        ></ion-icon>
                      </button>
                    </ion-item>
                    <ion-item lines="none">
                      <button @click.prevent="removeLastStep(step)">
                        <ion-icon
                          color="danger"
                          :icon="removeCircleOutline"
                        ></ion-icon>
                      </button>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-item>
            </ion-col>
          </ion-row>
        </div>

        <ion-fab class="bottom mt-20" horizontal="center">
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
  IonSegment,
  IonSegmentButton,
  toastController,
} from "@ionic/vue";
import {
  add,
  addCircleOutline,
  cameraOutline,
  removeCircleOutline,
} from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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
    IonSegment,
    IonSegmentButton,
  },
  emits: ["save-recipe"],
  data() {
    return {
      add,
      cameraOutline,
      addCircleOutline,
      removeCircleOutline,
      segment: "overview",
      name: "",
      photo: null,
      time: "",
      servings: "",
      course: "",
      ingredients: [
        {
          detail: "",
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
        course: this.course,
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
        saveToGallery: true,
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
    removeLastIngredient(ingredient) {
      const index = this.ingredients.indexOf(ingredient);
      if (index > -1) {
        this.ingredients.splice(index, 1);
      }
    },
    removeLastStep(step) {
      const index = this.instructions.indexOf(step);
      if (index > -1) {
        this.instructions.splice(index, 1);
      }
    },

    async presentToast(position) {
      const toast = await toastController.create({
        message: "Recipe Added!",
        duration: 1500,
        color: "dark",
        position: position,
      });
      await toast.present();
    },
    switchToSegment(value) {
      this.segment = value;
    },
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
  left: 0;
  right: 0;
  bottom: 10px;
  height: 56px;
  position: absolute;
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
ion-item {
  --highlight-color-focused: #7a3750;
}
ion-segment-button::part(indicator-background) {
  background: #7a3750;
}
ion-segment-button.ios::part(native) {
  color: #7a3750;
}

.segment-button-checked.ios::part(native) {
  color: #fff;
}
</style>
