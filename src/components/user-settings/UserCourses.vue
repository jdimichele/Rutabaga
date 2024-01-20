<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Courses:</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div class="inline-flex">
        <div>
          <ion-input
            placeholder="Appetizers"
            fill="outline"
            v-model="newCourse"
          ></ion-input>
        </div>
        <button @click.prevent="addNewIngredient()" class="p-2">
          <ion-icon color="success" :icon="addCircleOutline"></ion-icon>
        </button>
      </div>
      <ion-list>{{ courses }}</ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonList,
  IonIcon,
} from "@ionic/vue";
import { addCircleOutline } from "ionicons/icons";

export default {
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonList,
    IonIcon,
  },
  data() {
    return {
      addCircleOutline,
      newCourse: null,
      courses: [],
    };
  },
};
</script>

<style scoped>
ion-input {
  color: white;
  --highlight-color-focused: #7a3750;
}
</style>
