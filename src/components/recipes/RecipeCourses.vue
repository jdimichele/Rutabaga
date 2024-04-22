<template>
  <base-card>
    <ion-title class="my-2.5 text-center">Courses:</ion-title>
    <ion-accordion-group>
      <div v-if="hasCourses">
        <h3 class="text-center py-10">
          You need to add some courses for your recipes. Click on the gear at
          the top right and click 'Configure' to add some courses and
          categories!
        </h3>
      </div>
      <ion-accordion v-for="course in userCourses" :key="course">
        <recipe-course-item :courseName="`${course}`"></recipe-course-item>
      </ion-accordion>
    </ion-accordion-group>
  </base-card>
</template>

<script>
import { IonAccordion, IonAccordionGroup, IonTitle } from "@ionic/vue";
import { mapState, mapActions } from "vuex";
import RecipeCourseItem from "./RecipeCourseItem.vue";

export default {
  components: {
    IonAccordion,
    IonAccordionGroup,
    IonTitle,
    RecipeCourseItem,
  },
  methods: {
    ...mapActions("recipes", ["loadCourses"]),
  },
  computed: {
    ...mapState("recipes", ["userCourses"]),
    hasCourses() {
      return this.$store.getters["recipes/userCourses"];
    },
  },
  mounted() {
    this.loadCourses();
  },
};
</script>
