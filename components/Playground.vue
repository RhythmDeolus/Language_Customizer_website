<script setup>
import Editor from "./Editor.vue";
import Output from "./Output.vue";
import Creator from "./Creator.vue";
import { useRoute } from "vue-router";
import HL from "language_customizer";
import { ref } from "vue";


const route = useRoute();
let config = { keys: {} };
if (route.query.json) config = JSON.parse(atob(route.query.json));

const isActive = ref(false);

for (let key in config.keys) {
  HL.hl.setKeyword(key, config.keys[key]);
}

function toggleScreen2() {
  isActive.value = !isActive.value;
}

</script>

<template>
  <div class="screens">
    <div class="screen1" style="justify-content: center; align-items: center; display: flex">
      <div class="main-container has-background-grey-dark box">
        <Editor />
        <Output />
      </div>
    </div>
    
    <div ref="screen2" :class="['screen2', isActive ? 'active' : 'inactive']">
      <button class="button2" @click="toggleScreen2"><img src="/dist/right-arrow.png" alt="left arrow" srcset=""></button>
      <Creator :dynamic="true" />
    </div>
  </div>
</template>


<style scoped>
.main-container {
  width: 95%;
  height: 95%;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.screens {
  width: 100%;
  height: 100%;
}

.screen1 {
  position: absolute;
  width: 60%;
  height: 100%;
}

.screen2 {
  right: 0;
  width: 40%;
  height: 100%;
  position: absolute;
}

.button2 {
  position: absolute;
  width: 50px;
  height: 50px;
  top: calc(50% - 25px);
  left: -50px;
  transform: rotatez(180deg);
  display: none;
  background: transparent;
  border: none;
  filter: contrast(0.1) opacity(0.4)
}


@media screen and (max-width: 800px) {
  .screen2.inactive {
    width: 0px;
  }
  .screen2.active > .button2 {
    transform: none;
  }
  
  .button2 {
    display: block;
  }

  .screen2.active {
    width: 80%;
  }

  .screen1 {
    width: 100%;
  }
}
</style>