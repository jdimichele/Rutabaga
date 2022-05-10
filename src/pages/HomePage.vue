<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="recipes" href="/recipes">
          <ion-icon :icon="library" />
          <ion-label>All Recipes</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="favorites" href="/favorites">
          <ion-icon :icon="star" />
          <ion-label>Favorites</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="addrecipe" href="/addrecipe">
          <ion-icon :icon="addCircle" />
          <ion-label>Add Recipe</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="search" href="/search">
          <ion-icon :icon="search" />
          <ion-label>Search</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { library, addCircle, star, search} from 'ionicons/icons';

export default {
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      library, 
      addCircle, 
      star,
      search
    }
  }
}
</script>