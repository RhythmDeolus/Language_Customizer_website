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


<style scoped>

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
</style>