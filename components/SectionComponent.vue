<script setup>
import Dropdown from "./Dropdown.vue";
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
  <div class="section1">
    <Dropdown :title="props.title">
      <div class="desc">{{ props.desc }}</div>
      <pre class="highlighting2 is-family-monospace"
      aria-hidden="true"><code class="language-melang highlighting-content2" ref="codeId" ></code></pre>
    </Dropdown>
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

.desc {
  padding: 1rem;
}

p code {
  border-radius: 2px;
  background-color: #eee;
  color: #111;
  font-weight: 700;
}

.section1 {
  margin: auto;
  margin-bottom: 1rem;
}

.highlighting2 {
  /* Both elements need the same text and space styling so they are directly on top of each other */
  padding: 10px;
  border: 0;
  width: calc(100% - 2rem);
  height: 100%;
  margin: 0;
  scrollbar-width: thin;
  white-space: pre-wrap;
  filter: opacity(0.8);
  margin: 0 1rem 1rem 1rem;
}

.highlighting2 {
  background-color: black;
  filter: hue-rotate(54deg) saturate(1.9) brightness(0.8);
}
</style>