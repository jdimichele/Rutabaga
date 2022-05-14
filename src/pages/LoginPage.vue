<template>
  <ion-page>
    <div>
      <form @submit.prevent="login">
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
      </form>
    </div>
  </ion-page>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { fbSignIn } from "../data/firebase.js";
import { IonPage } from "@ionic/vue";
export default {
  components: { IonPage },

  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const login = async () => {
      fbSignIn(email, password);
      router.replace("/recipes");
    };
    return { email, password, login };
  },
};
</script>
