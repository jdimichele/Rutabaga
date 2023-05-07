<template>
  <base-card>
    <ion-title class="my-2.5 text-center">Categories:</ion-title>
    <ion-accordion-group>
      <!-- Removing :multiple="true" for the time being until the PM says otherwise. -->
      <ion-accordion>
        <recipe-category-item
          :categoryName="'Appetizers'"
        ></recipe-category-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-category-item
          :categoryName="'Breakfast'"
        ></recipe-category-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-category-item :categoryName="'Brunch'"></recipe-category-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-category-item :categoryName="'Dessert'"></recipe-category-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-category-item :categoryName="'Dinner'"></recipe-category-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-category-item :categoryName="'Drinks'"></recipe-category-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-category-item :categoryName="'Lunch'"></recipe-category-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-category-item :categoryName="'Sides'"></recipe-category-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-category-item :categoryName="'Snacks'"></recipe-category-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-category-item :categoryName="'Soups'"></recipe-category-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-category-item :categoryName="'Vegan'"></recipe-category-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-category-item
          :categoryName="'Vegetarian'"
        ></recipe-category-item>
      </ion-accordion>
    </ion-accordion-group>
  </base-card>
</template>

<script>
import { IonAccordion, IonAccordionGroup, IonTitle } from "@ionic/vue";
import RecipeCategoryItem from "./RecipeCategoryItem.vue";

export default {
  components: {
    IonAccordion,
    IonAccordionGroup,
    IonTitle,
    RecipeCategoryItem,
  },
  computed: {
    recipes() {
      return this.$store.getters["recipes/allRecipesByCategory"](this.category);
    },
  },
};
</script>
