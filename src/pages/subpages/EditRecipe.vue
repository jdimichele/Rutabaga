<template>
  <ion-page>
    <base-header title="Edit Recipe"></base-header>
    <ion-content>
      <base-loading v-if="isLoading"></base-loading>
      <base-card v-if="editedRecipe">
        <ion-grid>
          <form @submit.prevent="submitUpdatedRecipe">
            <img :src="editedRecipe.recipePhoto" />

            <ion-row>
              <ion-col>
                <div>
                  <h1>Name:</h1>
                  <input v-model="editedRecipe.recipeName" type="text" />
                </div>
              </ion-col>
            </ion-row>
            <br />
            <input v-model="editedRecipe.recipeTime" type="text" />
            <br />
            <input v-model="editedRecipe.recipeServings" />
            <br />
            <input v-model="editedRecipe.recipeCategory" type="text" />
            <br />
            <div v-for="(item, index) in editedIngredients" :key="index">
              <input v-model="editedRecipe.recipeIngredients[index].qty" />
              <input v-model="editedRecipe.recipeIngredients[index].unit" />
              <input v-model="editedRecipe.recipeIngredients[index].name" />
            </div>
            <br />
            <div v-for="(step, index) in editedInstructions" :key="index">
              <input
                v-model="
                  this.editedRecipe.recipeInstructions[index].instruction
                "
              />
            </div>
            <ion-item lines="none">
              <button @click.prevent="addNewStep(step)">
                <ion-icon color="success" :icon="addCircleOutline"></ion-icon>
              </button>
            </ion-item>
            <ion-item lines="none">
              <button @click.prevent="removeLastStep(step)">
                <ion-icon color="danger" :icon="removeCircleOutline"></ion-icon>
              </button>
            </ion-item>
            <button>Update</button>
          </form>
        </ion-grid>
      </base-card>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonIcon,
  toastController,
} from "@ionic/vue";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { mapGetters } from "vuex";

export default {
  components: {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonIcon,
  },

  data() {
    return {
      addCircleOutline,
      removeCircleOutline,
      editedIngredients: 0,
      editedInstructions: 0,
      isLoading: false,
      currentRecipe: {},
      editedRecipe: {
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
      },
    };
  },
  computed: {
    ...mapGetters("recipes", ["getRecipeByID"]),
  },
  methods: {
    async submitUpdatedRecipe() {
      this.isLoading = true;
      const updatedRecipe = {
        recipeID: this.editedRecipe.recipeID,
        name: this.editedRecipe.recipeName,
        photo: this.editedRecipe.recipePhoto,
        time: this.editedRecipe.recipeTime,
        servings: this.editedRecipe.recipeServings,
        category: this.editedRecipe.recipeCategory,
        ingredients: this.editedRecipe.recipeIngredients,
        instructions: this.editedRecipe.recipeInstructions,
      };

      await this.$store.dispatch("recipes/updateRecipe", updatedRecipe);

      this.isLoading = false;
      this.presentToast("middle");
      setTimeout(
        () => this.$router.push("/recipes/" + this.$route.params.id),
        1700
      );
    },

    async presentToast(position) {
      const toast = await toastController.create({
        message: "Recipe updated!",
        duration: 1500,
        position: position,
      });
      await toast.present();
    },

    addNewIngredient() {
      this.editedRecipe.recipeIngredients.push({});
    },
    addNewStep() {
      this.editedRecipe.recipeInstructions.push({});
    },
    removeLastIngredient(ingredient) {
      const index = this.editedRecipe.recipeIngredients.indexOf(ingredient);
      if (index > -1) {
        this.editedRecipe.recipeIngredients.splice(index, 1);
      }
    },
    removeLastStep(step) {
      const index = this.editedRecipe.recipeInstructions.indexOf(step);
      if (index > -1) {
        this.editedRecipe.recipeInstructions.splice(index, 1);
      }
    },

    // async takePicture() {
    //   const image = await Camera.getPhoto({
    //     quality: 100,
    //     allowEditing: true,
    //     source: CameraSource.Camera,
    //     resultType: CameraResultType.Base64,
    //   });
    //   if (image?.base64String) {
    //     const userId = firebase.auth().currentUser.uid;
    //     const guid = uuidv4();
    //     const filePath = `${userId}/images/${guid}.${image.format}`;

    //     const storageRef = firebase.storage().ref();
    //     await storageRef
    //       .child(filePath)
    //       .putString(image.base64String, "base64");
    //     return (this.photo = await storageRef.child(filePath).getDownloadURL());
    //   }
    // },
  },
  async mounted() {
    const recipeID = this.$route.params.id;
    const currentRecipe = await this.getRecipeByID(recipeID);
    this.editedRecipe = { ...currentRecipe };
    this.editedIngredients = this.editedRecipe.recipeIngredients.length;
    this.editedInstructions = this.editedRecipe.recipeInstructions.length;
  },
};
</script>
