<template>
  <ion-page>
    <base-header title="Edit Recipe"></base-header>
    <ion-content>
      <base-card>
        <form>
          <img :src="this.editedRecipe.recipePhoto"/>
          <input v-model="editedRecipe.recipeName" type="text" />
        </form>
      </base-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue";
import { mapGetters } from "vuex";

export default {
  components: { IonPage, IonContent },
  data() {
    return {
      editedRecipe: {},
    };
  },
  computed: {
    ...mapGetters("recipes", ["getRecipeByID"]),
  },
  methods: {},
  mounted() {
    const currentRecipe = this.$store.getters["recipes/getRecipeByID"](this.id);
    this.editedRecipe = { ...currentRecipe };
    this.$store.commit("recipes/setCurrentRecipeState", this.editedRecipe[0]);
  },
};
</script>
