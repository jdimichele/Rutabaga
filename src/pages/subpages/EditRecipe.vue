<template>
  <ion-page>
    <base-header title="Edit Recipe"></base-header>
    <ion-content>
      <base-card v-if="targetRecipe">
        <form>
          <img :src="targetRecipe.recipePhoto" />
          <input
            v-model="editedRecipe.name"
            type="text"
            :placeholder="targetRecipe.recipeName"
          />
          <br />
          <input
            v-model="editedRecipe.time"
            type="text"
            :placeholder="targetRecipe.recipeTime"
          />
          <br />
          <input
            v-model="editedRecipe.servings"
            type="text"
            :placeholder="targetRecipe.recipeServings"
          />
          <br />
          <input
            v-model="editedRecipe.category"
            :placeholder="targetRecipe.recipeCategory"
            type="text"
          />
          <br />
          <div v-for="(item, index) in targetIngredients" :key="index">
            <input
              v-model="editedRecipe.ingredients.qty"
              :placeholder="this.targetRecipe.recipeIngredients[index].qty"
            />
            <input
              v-model="editedRecipe.ingredients.unit"
              :placeholder="this.targetRecipe.recipeIngredients[index].unit"
            />
            <input
              v-model="editedRecipe.ingredients.name"
              :placeholder="this.targetRecipe.recipeIngredients[index].name"
            />
          </div>
          <br />
          <div v-for="(step, index) in targetInstructions" :key="index">
            <input
              v-model="step.instruction"
              :placeholder="
                this.targetRecipe.recipeInstructions[index].instruction
              "
            />
          </div>
        </form>
      </base-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue";
import { mapGetters } from "vuex";

export default {
  components: { IonPage, IonContent },
  data() {
    return {
      targetRecipe: {},
      targetInstructions: null,
      targetIngredients: null,
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
    this.targetRecipe = { ...currentRecipe };
    this.targetIngredients = this.targetRecipe.recipeIngredients.length;
    this.targetInstructions = this.targetRecipe.recipeInstructions.length;
    // this.$store.commit("recipes/setCurrentRecipeState", this.editedRecipe[0]);
  },
};
</script>
