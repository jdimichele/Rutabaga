<template>
  <ion-item>
    <ion-label position="floating">Photo:</ion-label>
    <ion-input
      type="none"
      id="photo"
      :value="this.photoUrl.val"
      @ionInput="this.photoUrl.val = $event.target.value"
      @click="takePicture"
    ></ion-input>
  </ion-item>
  <!-- <ion-button @click="takePicture">Pls</ion-button> -->
</template>

<script>
import { IonItem, IonLabel, IonInput } from "@ionic/vue";
import { Camera, CameraResultType } from "@capacitor/camera";

export default {
  components: { IonItem, IonLabel, IonInput },
  props: ["photo"],
  data() {
    return {
      photoUrl: null,
    };
  },
  methods: {
    async takePicture() {
      Camera.requestPermissions();
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.Base64,
      });

      if (image.base64String) {
        this.photoUrl = image;
      }
      return this.photoUrl;
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      // var imageUrl = image.webPath;
      // HTMLImageElement.src = imageUrl;
      // this.photoUrl = imageUrl;
      // console.log(imageUrl);
      // console.log(this.photoUrl);
    },
  },
};
</script>
