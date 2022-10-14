<template>
  <ion-button id="popover-button">
    <ion-icon slot="icon-only" :icon="settingsOutline"></ion-icon>
  </ion-button>
  <ion-popover trigger="popover-button" :dismiss-on-select="true">
    <ion-content>
      <ion-list>
        <ion-item :button="true" :detail="false" @click="logout"
          >Logout</ion-item
        >
      </ion-list>
    </ion-content>
  </ion-popover>
</template>

<script>
import {
  IonIcon,
  IonButton,
  IonPopover,
  IonContent,
  IonList,
  IonItem,
} from "@ionic/vue";

import { settingsOutline } from "ionicons/icons";

export default {
  components: {
    IonIcon,
    IonButton,
    IonPopover,
    IonContent,
    IonList,
    IonItem,
  },
  setup() {
    return { settingsOutline };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace('/auth');
    },
  },
};
</script>
