<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Courses:</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div class="inline-flex">
        <div>
          <ion-input
            placeholder="Add New"
            class=""
            v-model="newCourse"
          ></ion-input>
        </div>
        <button @click.prevent="addNewCourse()" class="p-2">
          <ion-icon color="success" :icon="addCircleOutline"></ion-icon>
        </button>
      </div>

      <div v-for="course in recipeCourses" :key="course" class="flex">
        {{ course }}
      </div>
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
  IonIcon,
} from "@ionic/vue";
import { addCircleOutline } from "ionicons/icons";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonIcon,
  },
  data() {
    return {
      addCircleOutline,
      newCourse: null,
    };
  },
  computed: {
    ...mapState("recipes", ["recipeCourses"]),
    ...mapGetters("recipes", ["getCourses"]),
  },
  methods: {
    ...mapActions("recipes", ["addCourse", "loadCourses"]),
    addNewCourse() {
      this.addCourse(this.newCourse);
      this.course = null;
    },
  },
  mounted() {
    this.loadCourses();
  },
};
</script>

<style scoped>
ion-input {
  color: white;
  --highlight-color-focused: #7a3750;
}
</style>
