<template>
  <ion-card @click="openRecipeDetails">
    <ion-list>
      <ion-item>
        <ion-text>
          <h6>{{ name }}</h6>
        </ion-text>
      </ion-item>
      <ion-item>
        <ion-text>
          <h6>{{ photo }}</h6>
        </ion-text>
      </ion-item>
      <ion-item>
        <ion-text>
          <h6>{{ servings }} servings</h6>
        </ion-text>
      </ion-item>
      <ion-item>
        <ion-text>
          <h6>{{ category }}</h6>
        </ion-text>
      </ion-item>
    </ion-list>
  </ion-card>
</template>

<script>
import { IonList, IonText, IonItem, IonCard } from "@ionic/vue";

export default {
  components: {
    IonList,
    IonText,
    IonItem,
    IonCard,
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
      this.$router.push({ name: "RecipeDetails", params: { id: this.targetRecipeID } });
    },
  },
  computed: {},
};
</script>
