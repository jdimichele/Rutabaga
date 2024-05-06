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
                    v-model="editedRecipe.recipeCourses"
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
                <h6 class="underline font-bold text-md text-white">
                  Ingredients:
                </h6>
                <div class="py-2 md:px-3">
                  <ion-list
                    v-for="(
                      ingredient, index
                    ) in editedRecipe.recipeIngredients"
                    :key="index"
                    class="flex md:flex md:items-stretch"
                  >
                    <ion-item class="md:mx-2">
                      <ion-input
                        class="px-1 w-64 md:mx-2"
                        type="text"
                        v-model="ingredient.detail"
                      ></ion-input>
                    </ion-item>

                    <ion-item lines="none">
                      <button type="button" @click.prevent="addNewIngredient()">
                        <ion-icon
                          color="success"
                          :icon="addCircleOutline"
                        ></ion-icon>
                      </button>
                    </ion-item>
                    <ion-item lines="none">
                      <button
                        type="button"
                        @click.prevent="removeLastIngredient()"
                      >
                        <ion-icon
                          color="danger"
                          :icon="removeCircleOutline"
                        ></ion-icon>
                      </button>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col>
                <h6 class="underline font-bold text-md text-white">
                  Instructions:
                </h6>
                <div class="py-2 md:px-3">
                  <ion-list
                    v-for="(ins, index) in editedRecipe.recipeInstructions"
                    :key="index"
                    class="flex md:flex md:items-stretch"
                  >
                    <ion-item class="md:mx-2">
                      <ion-input
                        class="px-1 w-64 md:mx-2"
                        type="text"
                        v-model="ins.instruction"
                      ></ion-input>
                    </ion-item>

                    <ion-item lines="none">
                      <button type="button" @click.prevent="addNewIngredient()">
                        <ion-icon
                          color="success"
                          :icon="addCircleOutline"
                        ></ion-icon>
                      </button>
                    </ion-item>
                    <ion-item lines="none">
                      <button
                        type="button"
                        @click.prevent="removeLastIngredient(ingredient)"
                      >
                        <ion-icon
                          color="danger"
                          :icon="removeCircleOutline"
                        ></ion-icon>
                      </button>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-col>
            </ion-row>
            <button
              class="m-8 w-52 h-10 rounded-lg bg-rut-generic-mauve text-lg text-white font-bold"
            >
              Update
            </button>
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
  //IonTextarea,
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
    //IonTextarea,
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
        categories: "",
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
        course: this.editedRecipe.recipeCourses,
        categories: this.editedRecipe.recipeCategories,
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
      this.editedRecipe.recipeIngredients.push({ detail: "" });
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

<style scoped>
ion-input.custom {
  color: white;
  --highlight-color-focused: #7a3750;
}
</style>
