<template>
  <ion-card @click="openRecipeDetails">
    <div class="recipeListCard">
      <img
        class="recipePhoto"
        :src="require(`../../../resources/icon/icon@2x.png`)"
      />
      <!-- Will need {{ photo }} interpolation here eventually. -->
      <ion-card-title class="recipeName">
        {{ name }}
      </ion-card-title>
      <ion-card-content>
        {{ servings }} servings

        <ion-badge slot="end">{{ category }}</ion-badge>
      </ion-card-content>
    </div>
  </ion-card>
</template>

<script>
import { IonCard, IonCardTitle, IonCardContent } from "@ionic/vue";

export default {
  components: {
    IonCard,
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
  computed: {},
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
ion-badge {
  --background: #7a3750;
}
</style>
