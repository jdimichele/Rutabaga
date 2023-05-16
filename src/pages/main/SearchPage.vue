<template>
  <ion-page>
    <base-header title="Search"></base-header>
    <ion-content :fullscreen="true">
      <search-recipes-item></search-recipes-item>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue";
import BaseHeader from "../../components/ui/BaseHeader.vue";
import SearchRecipesItem from "../../components/recipes/SearchRecipesItem.vue";

export default {
  components: {
    IonContent,
    IonPage,
    BaseHeader,
    SearchRecipesItem,
  },
};
</script>
