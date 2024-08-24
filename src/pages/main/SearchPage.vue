<template>
  <ion-page>
    <base-header title="Search"></base-header>
    <ion-content :fullscreen="true">
      <search-recipes-item></search-recipes-item>

      <div>
        <form @submit.prevent="handleSubmit">
          <input
            v-model="recipeUrl"
            type="text"
            placeholder="Enter recipe URL"
          />
          <button type="submit">Fetch Recipe</button>
        </form>
        <div v-if="recipe">
          <h1>{{ recipe.title }}</h1>
          <ul>
            <li v-for="ingredient in recipe.ingredients" :key="ingredient">
              {{ ingredient }}
            </li>
          </ul>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue";
import BaseHeader from "../../components/ui/BaseHeader.vue";
import SearchRecipesItem from "../../components/recipes/SearchRecipesItem.vue";
import fetchRecipe from "../../store/rutascraper.js";

export default {
  components: {
    IonContent,
    IonPage,
    BaseHeader,
    SearchRecipesItem,
  },
  data() {
    return {
      recipeUrl: "",
      recipe: null,
    };
  },
  methods: {
    async handleSubmit() {
      this.recipe = await fetchRecipe(this.recipeUrl);
      if (this.recipe) {
        console.log(this.recipe);
      }
    },
  },
};
</script>

<!--
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export default {
  setup() {
    const recipeUrl = ref('');
    const recipe = ref(null);

    const handleSubmit = async () => {
      recipe.value = await scrapeRecipe(recipeUrl.value);
      if (recipe.value) {
        // Save the recipe to Firebase Firestore
        const db = getFirestore();
        await setDoc(doc(db, 'recipes', new Date().toISOString()), recipe.value);
      }
    };

    return { recipeUrl, recipe, handleSubmit };
  },
}; -->
<!-- c -->
