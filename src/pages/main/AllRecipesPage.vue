<template>
  <ion-page>
    <base-header title="All Recipes"></base-header>
    <ion-grid :fixed="true">
      <ion-row>
        <ion-col>
          <recent-recipe></recent-recipe>
          <recipes-list></recipes-list>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonGrid, IonRow, IonCol } from "@ionic/vue";
import RecipesList from "@/components/recipes/RecipesList.vue";
import RecentRecipe from "../../components/recipes/RecentRecipe.vue";

export default defineComponent({
  components: {
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    RecipesList,
    RecentRecipe,
  },
});

/* 
At some point, will need to implement the refresher logic here, but for now, here's said logic:
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
*/
</script>

<style scoped>
ion-grid {
  --ion-grid-width-xs: 100%;
  --ion-grid-width-sm: 540px;
  --ion-grid-width-md: 720px;
  --ion-grid-width-lg: 960px;
  --ion-grid-width-xl: 1140px;
}
</style>
