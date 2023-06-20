<template>
  <ion-page>
    <base-header title="Edit Recipe"></base-header>
    <ion-content>
      <base-card v-if="editedRecipe">
        <form>
          <img :src="editedRecipe.recipePhoto" />
          <input v-model="editedRecipe.recipeName" type="text" />
          <br />
          <input v-model="editedRecipe.recipeTime" type="text" />
          <br />
          <input v-model="editedRecipe.recipeServings" type="text" />
          <br />
          <input v-model="editedRecipe.recipeCategory" type="text" />
          <br />

          <br />
          <input v-model="editedRecipe.recipeTime" type="text" />
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
    // this.$store.commit("recipes/setCurrentRecipeState", this.editedRecipe[0]);
  },
};
</script>
