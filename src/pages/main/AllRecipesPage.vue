<template>
  <ion-page>
    <base-header title="All Recipes"></base-header>
    <ion-content>
      <recipes-list></recipes-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import RecipesList from "@/components/recipes/RecipesList.vue";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    RecipesList,
  },
});
</script>
