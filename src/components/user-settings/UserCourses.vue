<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Courses:</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div class="inline-flex">
        <div>
          <input
            placeholder="Add New"
            type="text"
            class="h-10 w-full border border-white rounded-lg focus:border-rut-generic-mauve focus:ring-rut-generic-mauve px-2"
            v-model="newCourse"
          />
        </div>
        <button @click.prevent="addNewCourse()" class="p-2">
          <ion-icon color="success" :icon="addCircleOutline"></ion-icon>
        </button>
      </div>

      <div class="py-5">
        <ul class="ml-2">
          <li v-for="course in userCourses" :key="course" class="flex">
            {{ course }}

            <button @click.prevent="deleteCourse(course)" class="p-2">
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
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
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
