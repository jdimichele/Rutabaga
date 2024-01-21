<template>
  <ion-page>
    <base-header title="Settings"></base-header>
    <ion-content :fullscreen="true">
      <div class="grid grid-cols-1 sm:grid-cols-2">
        <div>
          <user-courses></user-courses>
        </div>
        <div>
          <user-categories></user-categories>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue";
import UserCategories from "../../components/user-settings/UserCategories.vue";
import UserCourses from "../../components/user-settings/UserCourses.vue";

export default {
  components: {
    IonContent,
    IonPage,
    UserCategories,
    UserCourses,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
