<template>
  <ion-page>
    <base-header title="Settings"></base-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col>
            <user-courses></user-courses>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <user-categories></user-categories>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/vue";
import UserCategories from "../../components/user-settings/UserCategories.vue";
import UserCourses from "../../components/user-settings/UserCourses.vue";

export default {
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    UserCategories,
    UserCourses,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
