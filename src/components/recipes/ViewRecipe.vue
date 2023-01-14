<template>
  <ion-card>
    <div v-if="isLoading">
      <ion-loading></ion-loading>
    </div>

    <div>
      <h2>{{}}</h2>
      <h2>{{}}</h2>
    </div>
  </ion-card>
</template>

<script>
import { IonCard, IonLoading } from "@ionic/vue";

export default {
  components: { IonCard, IonLoading },
  data() {
    return {
      isLoading: false,
      currentRecipe: null,
    };
  },
  // async mounted() {
  //   this.currentRecipe = await this.$store.getters["recipes/allRecipes"].filter((recipe) => {
  //     return (recipe.recipeID = this.$route.params.recipeid);
  //   });
  // },
};
</script>
