<template>
  <section id="firebaseui-auth-container"></section>
</template>

<script>
import firebase from "firebase";
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  data() {
    return {};
  },
  mounted() {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
      signInSucessfulUrl: "/recipes",
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDED_ID],
    };
    ui.start("#firebase-auth-container", uiConfig);
  },
};
</script>
