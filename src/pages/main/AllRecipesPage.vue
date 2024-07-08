<template>
  <ion-page>
    <base-header title="All Recipes"></base-header>
    <ion-content>
      <div class="grid grid-cols-1 sm:grid-cols-2">
        <!-- <div>Last Viewed:</div> -->
        <div>
          <recipes-list></recipes-list>
        </div>
        <div>
          <recipe-courses></recipe-courses>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue";
<<<<<<< HEAD
import RecipesList from "@/components/recipes/RecipesList.vue";
import RecipeCourses from "@/components/recipes/RecipeCourses.vue";
=======
import RecipesList from "../../components/recipes/RecipesList.vue";
import RecipeCourses from "../../components/recipes/RecipeCourses.vue";
>>>>>>> 3548129 (Due to Vue's new npm create script and the deprecation of Vue CLI,)

export default {
  components: {
    IonPage,
    IonContent,
    RecipesList,
    RecipeCourses,
  },
};
</script>

<style scoped></style>
