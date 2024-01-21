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

      <div>
        <div v-for="course in userCourses" :key="course" class="flex">
          {{ course }}

          <button @click.prevent="deleteCourse(course)" class="p-2">
            <ion-icon color="danger" :icon="removeCircleOutline"></ion-icon>
          </button>
        </div>
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
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { mapActions, mapState } from "vuex";

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
      removeCircleOutline,
      newCourse: "",
    };
  },
  computed: {
    ...mapState("recipes", ["userCourses"]),
  },
  methods: {
    ...mapActions("recipes", ["addCourse", "loadCourses", "deleteCourse"]),

    addNewCourse() {
      this.addCourse(this.newCourse);
      this.newCourse = "";
    },

    removeCourse(course) {
      this.deleteCourse(course);
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
