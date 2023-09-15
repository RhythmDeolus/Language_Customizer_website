<script setup>
import { ref } from "vue";

import Section from "./Section.vue";

import HL from "language_customizer";

const docId = ref("");

const tog = ref(true);

function showDoc() {
  docId.value.classList.add('is-active');
}

function hideDoc() {
  docId.value.classList.remove('is-active');
}

function updateDoc() {
  docs.value = HL.hl.getDocumentation();
  tog.value = !tog.value;
}

const docs = ref(HL.hl.getDocumentation());


defineExpose({
  showDoc,
  hideDoc,
  updateDoc,
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
        <Section v-for="item in docs" :key="tog? 2*item.id + 0: 2*item.id + 1" :title="item.title" :desc="item.desc" :code="item.code" />
      </section>
      <footer class="modal-card-foot has-background-dark">
        <button class="button is-success is-family-monospace" @click="hideDoc">Done</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal {
  padding: 11vh 1vw 1vh 1vw;
}
</style>