<template>
  <ion-page>
    <base-logo></base-logo>
  </ion-page>
</template>

<script>
import { IonPage } from "@ionic/vue";
import BaseLogo from "../../components/ui/BaseLogo.vue";

export default {
  components: {
    IonPage,
    BaseLogo,
  },
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      isLoading: false,
      error: null,
    };
  },
  computed: {},

  methods: {
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.loginForm {
  padding: 70px 0;
  display: flex;
  justify-content: center;
  align-content: center;
}

ion-button {
  display: flex;
  width: 200px;
  justify-content: center;
  align-items: center;
  margin: 30px;
}
</style>
