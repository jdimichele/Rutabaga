<template>
  <div>
    <ion-img
      src="/assets/icon/icon.png"
      class="logo"
    ></ion-img>
    <ion-title size="large">Rutabaga</ion-title>
  </div>
</template>

<script>
import { IonImg, IonTitle } from "@ionic/vue";
export default {
  components: {
    IonTitle,
    IonImg,
  },
};
</script>

<style scoped>
ion-title {
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 48px;
  text-align: center;
  --color: white;
}
.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 300px;
  width: 300px;
  margin-top: 50px;
}
</style>
