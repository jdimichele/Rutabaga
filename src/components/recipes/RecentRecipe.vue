<template>
  <ion-card>
    <!-- <div v-if="isLoading">
      <ion-loading></ion-loading>
    </div> -->

    <div>
      <button @click="recentlyAdded">Click pls</button>
      <h2>{{ recipeName }}</h2>
      <h3>{{ recipeTime }}</h3>
    </div>
  </ion-card>
</template>

<script>
import { IonCard } from "@ionic/vue";
// import RecipeItem from "../recipes/RecipeItem.vue";
import { useFirestore, useDocument } from "vuefire";
import { doc } from "@firebase/firestore";

export default {
  components: { IonCard },
  setup() {
    const db = useFirestore();

    const recipeData = useDocument(
      doc(db, "testrecipes", "C1QjNIgY5eGiGvD11zRn")
    );
    const recipeName = recipeData.data.value.name;
    const recipeTime = recipeData.data.value.time;

    function recentlyAdded() {
      console.log(recipeName);
    }

    return {
      recipeName,
      recipeTime,
      recentlyAdded,
    };
  },
};
</script>
