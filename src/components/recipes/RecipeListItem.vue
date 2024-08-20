<template>
  <ion-card @click="openRecipeDetails">
    <div class="container mx-auto">
      <img class="rounded-t-lg max-h-80 w-fit" :src="photo" />
      <div class="rounded-b-lg max-h-20">
        <ion-card-title class="pl-4 pt-1">
          {{ name }}
        </ion-card-title>
        <ion-card-content>
          <span>{{ servings }} servings</span>
          <ion-badge class="bg-rut-generic-mauve float-right">{{
            course
          }}</ion-badge>
        </ion-card-content>
      </div>
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
  props: ["id", "name", "photo", "servings", "course"],
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
