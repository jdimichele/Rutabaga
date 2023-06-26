<template>
  <ion-page>
    <base-header title="Edit Recipe">, IonRow</base-header>
    <ion-content>
      <base-loading v-if="isLoading"></base-loading>
      <base-card v-if="editedRecipe">
        <ion-grid>
          <form @submit.prevent="submitUpdatedRecipe">
            <img :src="editedRecipe.recipePhoto" />

            <ion-row>
              <ion-col>
                <input v-model="editedRecipe.recipeName" type="text" />
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
            <button @click="submitUpdatedRecipe">Update</button>
          </form>
        </ion-grid>
      </base-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/vue";
import { mapGetters } from "vuex";

export default {
  components: { IonPage, IonContent, IonGrid, IonRow, IonCol },
  data() {
    return {
      isLoading: false,
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
      this.$store.dispatch("recipes/updateRecipe", updatedRecipe);
      this.isLoading = false;
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
    // this.$store.commit("recipes/setCurrentRecipeState", this.editedRecipe[0]);
  },
};
</script>
