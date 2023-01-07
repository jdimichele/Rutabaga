<template>
  <ion-page>
    <base-header title="Add Recipe"></base-header>
    <ion-content :fullscreen="true">
      <add-recipe-form @save-recipe="saveRecipe"></add-recipe-form>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonContent, IonPage } from "@ionic/vue";
import BaseHeader from "../../components/ui/BaseHeader.vue";
import AddRecipeForm from "@/components/recipes/AddRecipeForm.vue";

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    BaseHeader,
    AddRecipeForm,
  },
  methods: {
    saveRecipe(data) {
      this.$store.dispatch("recipes/addRecipe", data);
      this.$router.replace("/addrecipe");
    },
  },
});
</script>
