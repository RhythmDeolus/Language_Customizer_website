<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import KeywordsDrop from "./KeywordsDrop.vue";

import HL from "language_customizer";

const router = useRouter();
const route = useRoute();

const keydropId = ref(null);

let v = computed(() => {
  let t = {};
  for (let key in getKeyStruct()) {
    t[key] = getKeyStruct()[key].value;
  }
  return "/playground?json=" + btoa(JSON.stringify({ keys: t }));
});

let v2 = route.fullPath;

const keywords = HL.hl.getKeywords();

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
    'punctuation': /[{}[\];(),.:]/,
  }
  Prism.languages.melang = language;
}

defineLang();


let props = defineProps(["dynamic"]);


function setKeywords() {
  v2 = v.value;
  for (let key in getKeyStruct()) {
    HL.hl.setKeyword(key, getKeyStruct()[key].value)
  }
  defineLang();
  mdtoast("Applied new language rules", { type: mdtoast.SUCCESS });
}

function shareLink() {
  navigator.clipboard.writeText(window.location.origin + v2);
  mdtoast("Copied to the clipboard", { type: mdtoast.SUCCESS });
}
function invalid(key1, key2) {
  getKeyStruct()[key1].error = true;
  getKeyStruct()[key2].error = true;
  mdtoast("Error: Keywords aren't unique", { type: mdtoast.ERROR });
}

function clearErrors() {
  for (let key in getKeyStruct()) {
    getKeyStruct()[key].error = false;
  }
}

function getKeyStruct() {
  return keydropId.value.keyStruct;
}

function check(reject = () => { }) {
  clearErrors();
  let set = {};
  for (let key in getKeyStruct()) {
    if (getKeyStruct()[key].value in set) {
      reject(key, set[getKeyStruct()[key].value]);
      return false;
    }
    set[getKeyStruct()[key].value] = key;
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
    <div class="subscreen has-background-grey-dark">
      <div class="container">
        <div class="dropdowns">
          <KeywordsDrop ref="keydropId" />
        </div>
      </div>
      <div class="button-list">
        <button @click="shareLink" class="button is-success is-family-monospace" v-if="props.dynamic">Share</button>
        <button @click="validate(setKeywords, invalid);" class="button is-success is-family-monospace"
          v-if="props.dynamic">Apply</button>

        <button class="button is-success is-family-monospace" @click="validate(goToPlay, invalid);"
          v-if="!props.dynamic">Go!</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  width: 100%;
  height: 88%;
  padding: 20px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  max-width: 100%;
  /* Firefox */
}

.container::-webkit-scrollbar {
  display: none;
}

.screen {
  position: absolute;
  overflow: hidden;
}

.button-list {
  position: absolute;
  right: 0;
  display: flex;
  justify-content: end;
  align-items: center;
  bottom: 1.5rem;
  margin: 1rem;
  z-index: 1px;
}

.button-list>* {
  margin: 0 10px;
}

.subscreen {
  right: 0;
  width: 100%;
  height: 100%;
  position: relative;
}

.screen {
  right: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  max-width: 100%;
}
</style>