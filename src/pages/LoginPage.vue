<template>
  <ion-router-outlet name="login" />
  <ion-page>
    <div>
      <form>
        <h3>Sign In</h3>
        <div>
          <label>Email address</label>
          <input type="text" v-model="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" v-model="password" />
        </div>
        <button type="submit" @click="login">Sign In</button>
      </form>
    </div>
  </ion-page>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { fbSignIn } from "../data/firebase.js";
import { IonPage, IonRouterOutlet } from "@ionic/vue";
export default {
  components: { IonPage, IonRouterOutlet },

  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const login = async () => {
      fbSignIn(email, password);
      router.replace("/home");
    };
    return { email, password, login };
  },
  // data() {
  //   return {
  //     user: {
  //       email: "",
  //       password: "",
  //     },
  //   };
  // },
  // methods: {
  //   userLogin() {
  //       signInWithEmailAndPassword(auth, this.user.email, this.user.password)
  //       .then(() => {
  //         this.$router.replace({ name: "recipes" });
  //       })
  //       .catch((error) => {
  //         alert(error.message);
  //       });
  //   },
  // },
};
</script>
