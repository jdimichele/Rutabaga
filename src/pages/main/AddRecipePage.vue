<template>
  <ion-page>
    <base-header title="Add Recipe"></base-header>
    <ion-content :fullscreen="true">
      <add-recipe-form></add-recipe-form>
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
});
</script>
