<template>
  <ion-card>
    <div v-if="isLoading">
      <ion-loading></ion-loading>
    </div>

    <div>
      <h2>Recently Viewed:</h2>
      <h2>{{ recent }}</h2>
    </div>
  </ion-card>
</template>

<script>
import { IonCard, IonLoading } from "@ionic/vue";
// import RecipeItem from "../recipes/RecipeItem.vue";

export default {
  components: { IonCard, IonLoading },
};
</script>
