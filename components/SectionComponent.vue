<script setup>

import { ref, onMounted } from "vue";

const props = defineProps(['title', 'desc', 'code']);

const codeId = ref(null);

function setCode() {
  if (props.code[props.length - 1] == "\n") {
    props.code += " ";
  }
  codeId.value.innerHTML = props.code
    .replace(new RegExp("&", "g"), "&amp;")
    .replace(new RegExp("<", "g"), "&lt;");

  Prism.highlightElement(codeId.value);
}

onMounted(setCode);

</script>


<template>
  <div class="section">
    <div class="title is-4 has-text-white-ter">{{ props.title }}</div>
    <hr>
    <div>{{ props.desc }}</div>
    <pre class="highlighting2 is-family-monospace"
      aria-hidden="true"><code class="language-melang highlighting-content2" ref="codeId" ></code></pre>
  </div>
</template>


<style scoped>
.highlighting2,
.highlighting2>* {
  font-size: 1.1rem;
  font-family: monospace;
  line-height: 1.5;
  tab-size: 2;
}

p code {
  border-radius: 2px;
  background-color: #eee;
  color: #111;
}

.highlighting2 {
  /* Both elements need the same text and space styling so they are directly on top of each other */
  padding: 10px;
  border: 0;
  width: calc(100%);
  height: 100%;
  margin: 0;
  scrollbar-width: thin;
}

.highlighting2 {
  background-color: black;
  filter: hue-rotate(54deg) saturate(1.9) brightness(0.5);
}
</style>