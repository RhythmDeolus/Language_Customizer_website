<script setup>
import Editor from "./Editor.vue";
import Output from "./Output.vue";
import Creator from "./Creator.vue";
import { useRoute } from "vue-router";
import HL from "language_customizer";


const route = useRoute();
let config = { keys: {} };
if (route.query.json) config = JSON.parse(atob(route.query.json));



for (let key in config.keys) {
  HL.hl.setKeyword(key, config.keys[key]);
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
    <div class="screen2">
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
</style>