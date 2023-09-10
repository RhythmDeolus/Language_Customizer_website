<script setup>
import { ref, computed } from "vue";
import Dropdown from "./Dropdown.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

let v = computed(() => {
  let t = {};
  for (let key in keyStruct.value) {
    t[key] = keyStruct.value[key].value;
  }
  return "/playground?json=" + btoa(JSON.stringify({ keys: t }));
});

let v2 = route.fullPath;

const keywords = HL.hl.getKeywords();
const reverseKeywords = HL.hl.getReverseKeywords();
const keyDesc = HL.hl.getKeyDesc();

const keyColors = HL.hl.getKeyColors();

function defineLang() {
  let language = {
    'keyword':
    {
      pattern: new RegExp(`\\b(?:${Object.keys(keywords).join("|")})\\b`)
    },
    'comment': [
      {
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true
      }
    ],
    'string': {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },
    'function': /\b\w+(?=\()/,
    'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    'punctuation': /[{}[\];(),.:]/
  }
  Prism.languages.melang = language;
}

defineLang();



let r = {};
for (let key in keywords) {
  r[keywords[key]] = {
    name: key,
    id: keywords[key],
    text: true,
    value: key,
    color: keyColors[keywords[key]],
    desc: keyDesc[keywords[key]],
    error: false,
  };
}

let props = defineProps(["dynamic"]);

const keyStruct = ref(r);

function setKeywords() {
  v2 = v.value;
  for (let key in keyStruct.value) {
    keyStruct.value[key].error = false;
    HL.hl.setKeyword(key, keyStruct.value[key].value)
  }
  defineLang();
}

function shareLink() {
  navigator.clipboard.writeText(window.location.origin + v2);
  mdtoast("Copied to the clipboard", { type: mdtoast.SUCCESS });
}
function invalid(key1, key2) {
  keyStruct.value[key1].error = true;
  keyStruct.value[key2].error = true;
  mdtoast("Error: Keywords aren't unique", { type: mdtoast.ERROR });
}

function check(reject =() => {}) {
  let set = {};
  for (let key in keyStruct.value) {
    if (keyStruct.value[key].value in set) {
      reject(key, set[keyStruct.value[key].value]);
      return false;
    }
    set[keyStruct.value[key].value] = key;
  }
  return true;
}

function validate(callback, reject) {
  if (check(reject)) callback();
}

function goToPlay() {
  router.push(v.value);
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
        <button @click="shareLink" class="button is-success is-family-monospace" v-if="props.dynamic">Share</button>
        <button @click="validate(setKeywords, invalid);" class="button is-success is-family-monospace" v-if="props.dynamic">Apply</button>

        <button class="button is-success is-family-monospace" @click="validate(goToPlay, invalid);" v-if="!props.dynamic">Go!</button>
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
  right: 0;
  display: flex;
  justify-content: end;
  align-items: center;
  bottom: 1.5rem;
}

.button-list>* {
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