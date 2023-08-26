<template>
  <ion-page>
    <base-header title="All Recipes"></base-header>
    <ion-content>
      <ion-grid :fixed="true">
        <ion-row>
          <ion-col size-md="7" size-sm="5">Last Viewed:</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size-md="7" size-sm="5">
            <recipes-list></recipes-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size-md="7" size-sm="5">
            <recipe-courses></recipe-courses>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonGrid, IonRow, IonCol, IonContent } from "@ionic/vue";
import RecipesList from "@/components/recipes/RecipesList.vue";
import RecipeCourses from "@/components/recipes/RecipeCourses.vue";

export default {
  components: {
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    RecipesList,
    RecipeCourses,
  },
};
</script>

<style scoped></style>
