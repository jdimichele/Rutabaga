<template>
  <ion-page>
    <base-header title="Edit Recipe"></base-header>
    <ion-content>
      <base-loading v-if="isLoading"></base-loading>
      <base-card v-if="editedRecipe">
        <ion-grid>
          <form @submit.prevent="submitUpdatedRecipe">
            <ion-row>
              <ion-col>
                <img class="rounded-t-lg" :src="editedRecipe.recipePhoto" />
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-input
                    label="Name:"
                    label-placement="stacked"
                    v-model="editedRecipe.recipeName"
                    type="text"
                  ></ion-input>
                </ion-item>
              </ion-col>

              <ion-col>
                <ion-item>
                  <ion-input
                    label="Course:"
                    label-placement="stacked"
                    v-model="editedRecipe.recipeCourse"
                    type="text"
                  ></ion-input>
                </ion-item>
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-input
                    label="Time:"
                    label-placement="stacked"
                    v-model="editedRecipe.recipeTime"
                    type="text"
                  >
                  </ion-input>
                </ion-item>
              </ion-col>

              <ion-col>
                <ion-item>
                  <ion-input
                    label="Servings:"
                    label-placement="stacked"
                    v-model="editedRecipe.recipeServings"
                    type="text"
                  >
                  </ion-input>
                </ion-item>
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col>
                <div
                  v-for="(ingredient, index) in editedRecipe.recipeIngredients"
                  :key="index"
                  class="flex"
                >
                  <ion-input
                    type="text"
                    v-model="ingredient.qty"
                    class="w-10"
                  ></ion-input>

                  <ion-input
                    v-model="ingredient.unit"
                    class="w-10 text-center"
                  ></ion-input>

                  <ion-textarea
                    v-model="ingredient.name"
                    class="break-words w-full"
                    :auto-grow="true"
                  ></ion-textarea>
                </div>
              </ion-col>
              <ion-item lines="none">
                <button @click.prevent="addNewIngredient()">
                  <ion-icon color="success" :icon="addCircleOutline"></ion-icon>
                </button>
              </ion-item>
              <ion-item lines="none">
                <button @click.prevent="removeLastIngredient()">
                  <ion-icon
                    color="danger"
                    :icon="removeCircleOutline"
                  ></ion-icon>
                </button>
              </ion-item>
            </ion-row>

            <ion-row>
              <ion-col>
                <div
                  v-for="(ins, index) in editedRecipe.recipeInstructions"
                  :key="index"
                >
                  <ion-textarea v-model="ins.instruction"></ion-textarea>
                </div>
              </ion-col>

              <button @click.prevent="addNewStep()">
                <ion-icon color="success" :icon="addCircleOutline"></ion-icon>
              </button>

              <button @click.prevent="removeLastStep()">
                <ion-icon color="danger" :icon="removeCircleOutline"></ion-icon>
              </button>
            </ion-row>
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
  IonInput,
  IonTextarea,
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
    IonInput,
    IonTextarea,
  },

  data() {
    return {
      addCircleOutline,
      removeCircleOutline,
      editedIngredients: {},
      editedInstructions: {},
      isLoading: false,
      editedRecipe: {
        name: "",
        photo: null,
        time: "",
        servings: "",
        course: "",
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
        course: this.editedRecipe.recipeCourse,
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
      this.editedRecipe.recipeIngredients.push({ qty: "", unit: "", name: "" });
      this.editedIngredients++;
    },
    addNewStep() {
      this.editedRecipe.recipeInstructions.push({ instruction: "" });
      this.editedInstructions++;
    },
    removeLastIngredient() {
      this.editedRecipe.recipeIngredients.pop();
      this.editedIngredients--;
    },
    removeLastStep() {
      this.editedRecipe.recipeInstructions.pop();
      this.editedInstructions--;
    },
  },
  async mounted() {
    const targetRecipe = await this.getRecipeByID(this.$route.params.id);
    this.editedRecipe = { ...targetRecipe };
    this.editedIngredients = this.editedRecipe.recipeIngredients;
    this.editedInstructions = this.editedRecipe.recipeInstructions;
  },
};
</script>
