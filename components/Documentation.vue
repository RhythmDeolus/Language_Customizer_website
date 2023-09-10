<script setup>
import { ref } from "vue";

import Section from "./Section.vue";

const docId = ref("");
defineProps(['ref']);

function showDoc() {
  docId.value.classList.add('is-active');
}

function hideDoc() {
  docId.value.classList.remove('is-active');
}


defineExpose({
  showDoc,
  hideDoc
})


</script>

<template>
  <div class="modal" ref="docId">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-background-dark">
        <p class="modal-card-title has-text-white-ter is-family-monospace">Documentation</p>
        <button class="delete" aria-label="close" @click="hideDoc"></button>
      </header>
      <section class="modal-card-body has-background-grey-dark has-text-white-ter is-family-monospace">
        <Section title="hello" desc="how" code="print 'hello';" />
      </section>
      <footer class="modal-card-foot has-background-dark">
        <button class="button is-success is-family-monospace" @click="hideDoc">Done</button>
      </footer>
    </div>
  </div>
</template>