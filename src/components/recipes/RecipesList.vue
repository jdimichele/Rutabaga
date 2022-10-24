<template>
  <!-- TODO: Recently Added Page, Recently Viewed Page, ???-->
  <ion-card>
    <ion-content>
      <ion-title>Recently Added:</ion-title>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content>
          <div v-if="isLoading">
            <ion-loading></ion-loading>
          </div>
          <div v-else-if="hasRecipes">
            <recipe-item
              v-for="recipe in recipes"
              :key="recipe.id"
              :id="recipe.id"
              :name="recipe.rname"
              :photo="recipe.photo"
              :time="recipe.time"
              :servings="recipe.servings"
              :ingredients="recipe.ingredients"
              :instructions="recipe.instructions"
            ></recipe-item>
          </div>
        </ion-refresher-content>
      </ion-refresher>
    </ion-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonTitle,
  IonLoading,
  IonRefresher,
  IonRefresherContent,
  IonContent,
} from "@ionic/vue";
import RecipeItem from "../recipes/RecipeItem.vue";

export default {
  components: {
    IonCard,
    IonTitle,
    IonLoading,
    IonRefresher,
    IonRefresherContent,
    IonContent,
    RecipeItem,
  },
  setup() {
    const doRefresh = (event) => {
      this.loadRecipes();
      setTimeout(() => {
        console.log("Async operation has ended.");
        event.target.complete();
      }, 2000);
    };
    return { doRefresh };
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async loadRecipes(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("recipes/loadRecipes", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Something exploded. :(";
      }
      this.isLoading = false;
    },
  },
  computed: {
    recipes() {
      const recipes = this.$store.getters["recipes/recipes"];
      return recipes;
    },
    hasRecipes() {
      return !this.isLoading && this.$store.getters["recipes/hasRecipes"];
    },
  },

  created() {
    this.loadRecipes();
  },
};
</script>
