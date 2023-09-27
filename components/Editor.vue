<script setup>
import { ref, defineOptions } from "vue";
import { useStore } from "vuex";
import Documentation from "./Documentation.vue";
import HL from "language_customizer";

const store = useStore();

const editorId = ref("");
const run = ref("");
const docId = ref("");


const isLoading = ref(false);

function update(text) {
  let result_element = document.querySelector("#highlighting-content");
  // Handle final newlines (see article)
  if (text[text.length - 1] == "\n") {
    text += " ";
  }
  // Update code
  result_element.innerHTML = text
    .replace(new RegExp("&", "g"), "&amp;")
    .replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
  // Syntax Highlight
  Prism.highlightElement(result_element);
}

function sync_scroll(element) {
  /* Scroll result to scroll coords of event - sync with textarea */
  let result_element = document.querySelector("#highlighting");
  // Get and set x and y
  result_element.scrollTop = element.scrollTop;
  result_element.scrollLeft = element.scrollLeft;
}
function calc(value) {
  console.log(value);
  let out = {
    value: "",
  };
  isLoading.value = true;
  HL.hl.run(value, out);
  isLoading.value = false;
  store.commit("changeOutput", out.value);
  if (out.err === true) {
    store.commit("changeOutputErr", out.errMsg);
  } else {
    store.commit("changeOutputErr", "");
  }
}

function check_tab(element, event) {
  let code = element.value;
  if (event.key == "Tab") {
    /* Tab key pressed */
    event.preventDefault(); // stop normal
    let before_tab = code.slice(0, element.selectionStart); // text before tab
    let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
    let cursor_pos = element.selectionStart + 1; // where cursor moves after tab - moving forward by 1 char to after tab
    element.value = before_tab + "\t" + after_tab; // add tab char
    // move cursor
    element.selectionStart = cursor_pos;
    element.selectionEnd = cursor_pos;
    update(element.value); // Update text to include indent
  }
  if (event.key == "Enter" && event.ctrlKey) {
    calc(editorId.value.value);
  }
}

function showDoc() {
  docId.value.updateDoc();
  docId.value.showDoc();
}

</script>

<template>
  <Documentation ref="docId" />
  <div class="stack">
    <textarea id="editing" ref="editorId" spellcheck="false" @input="(event) => {
      update(event.target.value);
      sync_scroll(event.target);
    }
      " @scroll="(event) => {
    sync_scroll(event.target);
  }
    " @keydown="(event) => check_tab(event.target, event)"></textarea>

    <pre id="highlighting" aria-hidden="true">
      <code class="language-melang" id="highlighting-content"></code>
      </pre>
  </div>

  <div class="contain-buttons">
    <button :class="['button', 'is-success', 'is-family-monospace']" ref="run" @click="showDoc" type="button"
      style="position: relative; float: right; margin: 0 20px">
      Documentation
    </button>
    <button :class="['button', 'is-success', 'is-family-monospace', isLoading ? 'is-loading' : '']" ref="run"
      @click="calc(editorId.value)" type="button" style="position: relative; float: right; margin: 0 20px">
      Run
    </button>
  </div>
</template>

<style scoped>
/* Please see the article */

.contain-buttons {
  overflow: auto;
  height: 15%;
  display: flex;
  justify-content: end;
  align-items: center;
}

.contain-buttons>* {
  margin-right: 1rem;
}

#editing::-webkit-scrollbar,
#highlighting::-webkit-scrollbar {
  width: 10px;
}

#editing::-webkit-scrollbar-track,
#highlighting::-webkit-scrollbar-track {
  background-color: darkgrey;
}

#editing::-webkit-scrollbar-thumb,
#highlighting::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

#highlighting {
  background-color: black;
  filter: hue-rotate(54deg) saturate(1.9) brightness(0.5);
}

#editing,
#highlighting {
  /* Both elements need the same text and space styling so they are directly on top of each other */
  padding: 10px;
  border: 0;
  width: calc(100%);
  height: 100%;
  margin: 0;
  scrollbar-width: thin;
}

#editing,
#highlighting,
#highlighting * {
  /* Also add text styles to highlighing tokens */
  font-size: 1.1rem;
  font-family: monospace;
  line-height: 1.5;
  tab-size: 2;
}

#editing:focus {
  outline: none;
}

.stack {
  display: grid;
  margin: 0 10px;
  height: 40%;
}

.stack>* {
  grid-row: 1;
  grid-column: 1;
}

/* Move the textarea in front of the result */

#editing {
  z-index: 1;
}

#highlighting {
  z-index: 0;
}

/* Make textarea almost completely transparent */

#editing {
  color: transparent;
  background: transparent;
  caret-color: white;
  /* Or choose your favourite color */
}

/* Can be scrolled */
#editing,
#highlighting {
  overflow: auto;
  white-space: nowrap;
  /* Allows textarea to scroll horizontally */
}

/* No resize on textarea */
#editing {
  resize: none;
}

/* Paragraphs; First Image */
* {
  font-family: "Fira Code", monospace;
}

p code {
  border-radius: 2px;
  background-color: #eee;
  color: #111;
}

</style>