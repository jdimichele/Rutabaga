<template>
  <ion-page>
    <base-header title="Search"></base-header>
    <ion-content :fullscreen="true">
      <ion-searchbar
        class="py-10"
        mode="ios"
        v-model="search"
        placeholder="Time to find that perfect recipe..."
      ></ion-searchbar>
      <div>
        <ul>
          <li v-if="searchRecipes.length === 1">
            {{ searchRecipes[0].recipeName }}
          </li>
          <li
            v-else
            v-for="recipe in searchRecipes"
            :key="recipe.recipeID"
            @click="openRecipeDetails(recipe.recipeID)"
          >
            {{ recipe.recipeName }}
          </li>
        </ul>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonSearchbar } from "@ionic/vue";
import BaseHeader from "../../components/ui/BaseHeader.vue";

export default {
  components: {
    IonContent,
    IonPage,
    IonSearchbar,
    BaseHeader,
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    openRecipeDetails(targetID) {
      this.$router.push({
        name: "RecipeDetails",
        params: { id: targetID },
      });
    },
  },
  computed: {
    searchRecipes() {
      return this.$store.getters["recipes/getRecipeByName"](this.search);
    },
  },
};
</script>
