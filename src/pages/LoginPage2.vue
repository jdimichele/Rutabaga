<template>
  <section id="firebaseui-auth-container"></section>
</template>

<script>
import firebase from "firebase";
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = firebaseui.auth.AuthUI(firebase.auth());
    }
    const uiConfig = {
      signInSuccessUrl: "/home",
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    };
    ui.start("#firebase-auth-container", uiConfig);
  },
};
</script>
