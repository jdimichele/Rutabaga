<template>
  <ion-page>
    <base-header title="Favorites"></base-header>
    <ion-content :fullscreen="true">
      <favorites-list></favorites-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import FavoritesList from "../../components/recipes/FavoritesList.vue";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    FavoritesList,
  },
});
</script>
