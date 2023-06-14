<template>
  <ion-card @click="openRecipeDetails">
    <img class="max-w-full rounded-t-lg h-50" :src="photo" />
    <div class="rounded-b-lg overflow-hidden">
      <ion-card-title class="pl-4 pt-1">
        {{ name }}
      </ion-card-title>
      <ion-card-content>
        <span>{{ servings }} servings</span>
        <ion-badge class="bg-rut-generic-mauve float-right">{{
          category
        }}</ion-badge>
      </ion-card-content>
    </div>
  </ion-card>
</template>

<script>
import { IonCard, IonCardTitle, IonCardContent, IonBadge } from "@ionic/vue";

export default {
  components: {
    IonCard,
    IonBadge,
    IonCardTitle,
    IonCardContent,
  },
  props: ["id", "name", "photo", "servings", "category"],
  data() {
    return {
      targetRecipeID: null,
    };
  },
  methods: {
    openRecipeDetails() {
      this.targetRecipeID = this.id;
      this.$router.push({
        name: "RecipeDetails",
        params: { id: this.targetRecipeID },
      });
    },
  },
};
</script>
