<template>
  <base-card>
    <ion-title class="my-2.5 text-center">Categories:</ion-title>
    <ion-accordion-group :multiple="true">
      <ion-accordion @click.prevent="">
        <ion-item slot="header">
          <ion-label>Appetizers</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">Popcorn</div>
      </ion-accordion>
      <ion-accordion>
        <ion-item slot="header">
          <ion-label>Breakfast</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">More Popcorn!</div>
      </ion-accordion>
      <ion-accordion>
        <ion-item slot="header">
          <ion-label>Brunch</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">EVEN MORE Popcorn!</div>
      </ion-accordion>
      <ion-accordion>
        <ion-item slot="header">
          <ion-label>Dinner</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">
          <!-- <ul>
            <li v-for="recipe in recipes" :key="recipe.recipeID">
              {{ recipe.recipeName }}
            </li> -->
          <recipe-list-item
            v-for="(recipe, index) in recipes"
            :key="index"
            :id="recipe.recipeID"
            :name="recipe.recipeName"
            :category="recipe.recipeCategory"
          ></recipe-list-item>
          <!-- </ul> -->
        </div>
      </ion-accordion>
    </ion-accordion-group>
  </base-card>
</template>

<script>
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonTitle,
} from "@ionic/vue";
import RecipeListItem from "./RecipeListItem.vue";

export default {
  components: {
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonTitle,
    RecipeListItem,
  },

  computed: {
    recipes() {
      return this.$store.getters["recipes/allRecipesByCategory"]("Dinner");
    },
  },
};
</script>
