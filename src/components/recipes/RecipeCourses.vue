<template>
  <base-card>
    <ion-title class="my-2.5 text-center">Courses:</ion-title>
    <ion-accordion-group>
      <ion-accordion>
        <recipe-course-item :courseName="'Appetizers'"></recipe-course-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-course-item :courseName="'Breakfast'"></recipe-course-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-course-item :courseName="'Desserts'"></recipe-course-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-course-item :courseName="'Dinner'"></recipe-course-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-course-item :courseName="'Drinks'"></recipe-course-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-course-item :courseName="'Lunch'"></recipe-course-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-course-item :courseName="'Sauces'"></recipe-course-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-course-item :courseName="'Sides'"></recipe-course-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-course-item :courseName="'Snacks'"></recipe-course-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-course-item :courseName="'Soups'"></recipe-course-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-course-item :courseName="'Staples'"></recipe-course-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-course-item :courseName="'Vegan'"></recipe-course-item>
      </ion-accordion>

      <ion-accordion>
        <recipe-course-item :courseName="'Vegetarian'"></recipe-course-item>
      </ion-accordion>
    </ion-accordion-group>
  </base-card>
</template>

<script>
import { IonAccordion, IonAccordionGroup, IonTitle } from "@ionic/vue";
import RecipeCourseItem from "./RecipeCourseItem.vue";

export default {
  components: {
    IonAccordion,
    IonAccordionGroup,
    IonTitle,
    RecipeCourseItem,
  },
};
</script>
