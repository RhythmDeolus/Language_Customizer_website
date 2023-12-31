import Vue, { createApp } from "vue"

import { createStore } from "vuex";

import App from "./App.vue"

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css' // optional for styling


import Playground from "./components/Playground.vue";
import Creator from "./components/Creator.vue";
import Home from "./components/Home.vue";

const routes = [
  { path: '/playground', component: Playground },
  { path: '/creator', component: Creator },
  { path: '/', component: Home },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes,
  mode: 'history'
})

const moduleA = {
  state() {
    return {
      output: "",
      outputErr: ""
    }
  },
  mutations: {
    changeOutput(state, output) {
      state.output = output;
    },
    changeOutputErr(state, outputErr) {
      state.outputErr = outputErr;
    }
  }
}

const moduleB = {
  state() {
    return {
      keywords: {}
    }
  },
  mutations: {
    addKeyword(state, key, value) {
      state.keywords[key] = value;
    },
    removeKeyword(state, key) {
      delete state.keywords[key];
    }
  }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

// new Vue({
//     components: { App },
//     template: "<App />",
// }).$mount("#app");

const app = createApp(App).use(store).use(router);

app.use(
  VueTippy,
  {
    directive: 'tippy', // => v-tippy
    component: 'tippy', // => <tippy/>
  }
)

app.mount("#app");
