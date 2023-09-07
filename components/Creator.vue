<script setup>
import { ref, computed } from "vue";
import Dropdown from "./Dropdown.vue";

let v = computed(() => {
  let t = {};
  for (let key in keyStruct.value) {
    t[key] = keyStruct.value[key].value;
  }
  return "/playground?json=" + btoa(JSON.stringify({ keys: t }));
});

const keywords = HL.hl.getKeywords();

let r = {};
for (let key in keywords) {
  r[key] = {
    name: key,
    id: keywords[key],
    text: true,
    value: key,
  };
}

let props = defineProps(["dynamic"]);

const keyStruct = ref(r);

function setKeywords() {
  for (let key in keyStruct.value) {
    let c = keywords[key];
    delete keywords[key];
    keywords[keyStruct.value[key].value] = c;
  }
}

function shareLink() {
  navigator.clipboard.writeText(window.location.origin + v.value);
  mdtoast("Copied to the clipboard", {type: mdtoast.SUCCESS});
}
</script>

<template>
  <div class="screen">
    <div class="subscreen">
      <div class="container has-background-grey-dark">
        <div class="dropdowns">
          <Dropdown title="Keywords" :struct="keyStruct" class=""></Dropdown>
        </div>
      </div>
      <div class="button-list">
        <button @click="shareLink" class="button is-success" v-if="props.dynamic">Share</button>
        <button @click="setKeywords" class="button is-success" v-if="props.dynamic">Apply</button>

        <router-link class="button is-success" :to="v" v-if="!props.dynamic">Go!</router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.container::-webkit-scrollbar {
  display: none;
}


.button-list {
  position: absolute;
  width: 90%;
  display: flex;
  justify-content: end;
  align-items: center;
  left: 0;
  bottom: 1.5rem;
}

.button-list > * {
  margin: 0 10px;
}

.subscreen {
  right: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}

.screen {
  right: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>