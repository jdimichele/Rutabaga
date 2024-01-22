<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Categories:</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div class="inline-flex">
        <div>
          <input
            placeholder="Add New"
            type="text"
            class="h-10 w-full border border-white rounded-lg focus:border-rut-generic-mauve focus:ring-rut-generic-mauve px-2"
            v-model="newCategory"
          />
        </div>
        <button @click.prevent="addNewCategory()" class="p-2">
          <ion-icon color="success" :icon="addCircleOutline"></ion-icon>
        </button>
      </div>

      <div class="py-5">
        <ul class="ml-2">
          <li v-for="category in userCategories" :key="category" class="flex">
            {{ category }}

            <button @click.prevent="deleteCategory(category)" class="p-2">
              <ion-icon color="danger" :icon="removeCircleOutline"></ion-icon>
            </button>
          </li>
        </ul>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/vue";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { mapActions, mapState } from "vuex";

export default {
  components: { IonCard, IonCardHeader, IonCardTitle, IonCardContent },
  data() {
    return {
      addCircleOutline,
      removeCircleOutline,
      newCategory: "",
    };
  },
  computed: {
    ...mapState("recipes", ["userCategories"]),
  },
  methods: {
    ...mapActions("recipes", [
      "addCategory",
      "loadCategories",
      "deleteCategory",
    ]),

    addNewCategory() {
      this.addCategory(this.newCategory);
      this.newCategory = "";
    },

    removeCategory(category) {
      this.deleteCategory(category);
    },
  },
  mounted() {
    this.loadCategories();
  },
};
</script>

<style scoped>
ion-input {
  color: white;
  --highlight-color-focused: #7a3750;
}
</style>
