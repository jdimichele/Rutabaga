<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Categories:</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <ion-grid>
        <ion-row>
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
</template>

<script>
import {
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
