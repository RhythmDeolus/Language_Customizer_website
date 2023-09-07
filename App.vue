<script setup>
import {useRoute} from 'vue-router'
const route = useRoute();
import Navbar from './components/Navbar.vue';

import Matrix from './components/Matrix.vue';

</script>

<template>
  <Navbar v-if="route.path != '/'" />
  <div :class="['screen', route.path == '/'? 'home-screen': 'normal-screen']">
    <router-view />
  </div>
  <Matrix />
</template>


<style>

.home-screen {
  height: 100%;
}
.normal-screen {
  height: 90%;
}
.screen {
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 2;
}

.has-background-dark {
  background-color: #36363685!important;
}
.has-background-grey-dark {
  background-color: #4a4a4a42!important;
}
.navbar.is-dark {
  background-color: #36363675;
  color: #fff;
}
.has-background-success-dark {
  background-color: #25795366!important;
}
.button.is-success {
  background-color: #48c78e5e;
  border-color: transparent;
  color: #fff;
}

.button.is-success.is-outlined.is-focused, .button.is-success.is-outlined.is-hovered, .button.is-success.is-outlined:focus, .button.is-success.is-outlined:hover {
    background-color: #48c78e52;
    border-color: #48c78e;
    color: #fff;
}
</style>