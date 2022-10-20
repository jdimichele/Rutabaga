<template>
  <ion-page>
    <base-header title="Add Recipe"></base-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Add Recipe</ion-title>
        </ion-toolbar>
      </ion-header>

      <add-recipe-form></add-recipe-form>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
} from "@ionic/vue";
import AddRecipeForm from "@/components/recipes/AddRecipeForm.vue";

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    AddRecipeForm,
  },
});
</script>
