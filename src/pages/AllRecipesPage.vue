<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>All Recipes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">All Recipes</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Recently Viewed:</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <p>Placeholder for image</p>

          <p>placeholder for title</p>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Categories:</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-grid>
            <ion-row class="ion-align-items-center">
              <ion-col>
                <ion-list>
                  <ion-item>
                    <ion-label> Appetizers </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label> Breakfast </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label> Brunch </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label> Dessert </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label> Dinner </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label> Drinks </ion-label>
                  </ion-item>
                </ion-list>
              </ion-col>
              
              <ion-col>
                <ion-list>
                  <ion-item>
                    <ion-label> Lunch </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label> Sides </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label> Snacks </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label> Soups </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label> Vegan </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label> Vegetarian </ion-label>
                  </ion-item>
                </ion-list>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/vue";

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel,
    IonGrid,
    IonCol,
    IonRow,
  },
};
</script>
