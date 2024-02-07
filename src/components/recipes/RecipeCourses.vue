<template>
  <base-card>
    <ion-title class="my-2.5 text-center">Courses:</ion-title>
    <ion-accordion-group>
      <div v-show="getCategories">
        <h3 class="text-center py-10">
          You need to add some categories for your recipes. Click on the gear at
          the top right and click 'Configure' to add some courses and categories!
        </h3>
      </div>
      <ion-accordion v-for="category in getCategories" :key="category">
        <recipe-course-item :courseName="`${category}`"></recipe-course-item>
      </ion-accordion>
    </ion-accordion-group>
  </base-card>
</template>

<script>
import { IonAccordion, IonAccordionGroup, IonTitle } from "@ionic/vue";
import { mapGetters } from "vuex";
import RecipeCourseItem from "./RecipeCourseItem.vue";

export default {
  components: {
    IonAccordion,
    IonAccordionGroup,
    IonTitle,
    RecipeCourseItem,
  },
  computed: {
    ...mapGetters("recipes", ["getCategories"]),
  },
};
</script>
