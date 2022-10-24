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
