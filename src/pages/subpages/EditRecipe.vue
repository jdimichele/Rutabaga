<template>
  <ion-page>
    <base-header title="Edit Recipe">, IonRow</base-header>
    <ion-content>
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
            <input v-model="editedRecipe.servings" type="text" />
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
    async updateRecipe() {},
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
