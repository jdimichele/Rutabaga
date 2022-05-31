<template>
  <ion-page>
    <ion-form @submit="login">
    <div>
        <h3>Sign In</h3>
        <div>
          <label>Email address</label>
          <input type="text" v-model="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" v-model="password" />
        </div>
        <button type="submit">Sign In</button>
    </div>
    </ion-form>
  </ion-page>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { fbSignIn, auth } from "../data/firebase.js";
import { IonPage } from "@ionic/vue";
export default {
  components: { IonPage },

  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const login = async () => {
      if(fbSignIn(auth, email, password)){
        router.replace("/recipes");
      } else {
        alert('Invalid Email or Password.');
        router.replace("/");
      }
    };
    return { email, password, login };
  },
};
</script>
