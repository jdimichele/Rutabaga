<template>
  <ion-card @click="openRecipeDetails">
    <img
      class="recipePhoto"
      :src="require(`../../../resources/icon/icon@2x.png`)"
    />
    <div class="recipeListCard">
      <!-- Will need {{ photo }} interpolation here eventually. -->
      <ion-card-title class="recipeName">
        {{ name }}
      </ion-card-title>
      <ion-card-content>
        <span class="recipeServings">{{ servings }} servings</span>
        <ion-badge class="recipeBadge">{{ category }}</ion-badge>
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

<style scoped>
.recipeListCard {
  border-radius: 0.5rem;
  padding-bottom: 1rem;
  overflow: hidden;
}
.recipePhoto {
  width: 100%;
  border-radius: 0.5rem 0.5rem 0 0;
  height: 300px;
}
.recipeBadge {
  background-color: #7a3750;
  float: right;
}
.recipeName {
}
</style>
