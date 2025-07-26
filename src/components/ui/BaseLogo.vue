<template>
  <div>
    <ion-img
      src="/assets/icon/icon.png"
      class="logo"
    ></ion-img>
    <ion-title class="yoshi-title">Rutabaga</ion-title>
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
.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 300px;
  width: 300px;
  margin-top: 50px;
}
</style>
