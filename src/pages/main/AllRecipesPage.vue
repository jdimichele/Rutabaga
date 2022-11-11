<template>
  <ion-page>
    <base-header title="All Recipes"></base-header>
    <ion-content>
      <ion-grid :fixed="true">
        <ion-row>
          <ion-col>
            <recipes-list></recipes-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonGrid, IonRow, IonCol,IonContent } from "@ionic/vue";
import RecipesList from "@/components/recipes/RecipesList.vue";

export default defineComponent({
  components: {
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
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

<style scoped>
ion-grid {
  --ion-grid-width-xs: 50%;
  --ion-grid-width-sm: 288px;
  --ion-grid-width-md: 384px;
  --ion-grid-width-lg: 480px;
  --ion-grid-width-xl: 570px;
}
</style>
