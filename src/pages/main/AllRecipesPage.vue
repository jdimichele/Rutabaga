<template>
  <ion-page>
    <base-header title="All Recipes"></base-header>
    <ion-grid>

        <recipes-list></recipes-list>

    </ion-grid>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonGrid } from "@ionic/vue";
import RecipesList from "@/components/recipes/RecipesList.vue";

export default defineComponent({
  components: {
    IonPage,

    IonGrid,
    RecipesList,
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
