<template></template>

<script>
import { camera, trash, close } from "ionicons/icons";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";

export function usePhotoGallery() {
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
  };
  return {
    takePhoto,
  };
}

export default {
  setup() {
    return {
      camera,
      trash,
      close,
      takePhoto,
    };
  },
  methods: {},
};
</script>
>
