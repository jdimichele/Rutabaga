<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3548129 (Due to Vue's new npm create script and the deprecation of Vue CLI,)
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import { IonicVue } from "@ionic/vue";
import "wakelock-lazy-polyfill";
<<<<<<< HEAD

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
// import "@ionic/vue/css/padding.css";
// import "@ionic/vue/css/float-elements.css";
// import "@ionic/vue/css/text-alignment.css";
// import "@ionic/vue/css/text-transformation.css";
// import "@ionic/vue/css/flex-utils.css";
// import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Imports for global components. */
import BaseCard from "./components/ui/BaseCard.vue";
import BaseHeader from "./components/ui/BaseHeader.vue";
import BaseLogo from "./components/ui/BaseLogo.vue";
import BaseLoading from "./components/ui/BaseLoading.vue";

/* Ionic Loading component. */
import { defineCustomElements } from "@ionic/pwa-elements/loader";
defineCustomElements(window);

const app = createApp(App);

app
  .component("base-card", BaseCard)
  .component("base-header", BaseHeader)
  .component("base-logo", BaseLogo)
  .component("base-loading", BaseLoading);

app.use(router).use(store).use(IonicVue, {
  mode: "md",
});

router.isReady().then(() => {
  app.mount("#app");
=======
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
=======
>>>>>>> 3548129 (Due to Vue's new npm create script and the deprecation of Vue CLI,)

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
// import "@ionic/vue/css/padding.css";
// import "@ionic/vue/css/float-elements.css";
// import "@ionic/vue/css/text-alignment.css";
// import "@ionic/vue/css/text-transformation.css";
// import "@ionic/vue/css/flex-utils.css";
// import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Imports for global components. */
import BaseCard from "./components/ui/BaseCard.vue";
import BaseHeader from "./components/ui/BaseHeader.vue";
import BaseLogo from "./components/ui/BaseLogo.vue";
import BaseLoading from "./components/ui/BaseLoading.vue";

/* Ionic Loading component. */
import { defineCustomElements } from "@ionic/pwa-elements/loader";
defineCustomElements(window);

const app = createApp(App);

app
  .component("base-card", BaseCard)
  .component("base-header", BaseHeader)
  .component("base-logo", BaseLogo)
  .component("base-loading", BaseLoading);

app.use(router).use(store).use(IonicVue, {
  mode: "md",
});

router.isReady().then(() => {
<<<<<<< HEAD
  app.mount('#app');
>>>>>>> 7d81db9 (Initial commit. Note: Due to Vue CLI being deprecated and constant webpack issues, I've)
=======
  app.mount("#app");
>>>>>>> 3548129 (Due to Vue's new npm create script and the deprecation of Vue CLI,)
});
