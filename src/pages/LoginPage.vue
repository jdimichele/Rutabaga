<template>
  <div>
    <form @submit.prevent="userLogin">
      <h3>Sign In</h3>
      <div class="form-group">
        <label>Email address</label>
        <input
          type="email"
          class="form-control form-control-lg"
          v-model="user.email"
        />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          class="form-control form-control-lg"
          v-model="user.password"
        />
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">
        Sign In
      </button>
    </form>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "@firebase/auth";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    userLogin() {
      signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.$router.push("/recipes");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
