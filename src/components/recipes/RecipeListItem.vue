<template>
  <ion-card @click="openRecipeDetails(this.id)">
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
    openRecipeDetails(id) {
      this.targetRecipeID = this.id;
      console.log(this.targetRecipeID);
      this.$router.push({ name: "RecipeDetails", params: { id: id } });
    },
  },
  computed: {},
};
</script>
