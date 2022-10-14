<template>
    <ion-page>
      <base-header title="Search"></base-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Search</ion-title>
          </ion-toolbar>
        </ion-header>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  
  export default defineComponent({
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
  });
  </script>
  