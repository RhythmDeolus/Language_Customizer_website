<script setup>
import { ref } from 'vue';
import Dropdown from './Dropdown.vue';
import HL from "language_customizer";


const keywords = HL.hl.getKeywords();
const reverseKeywords = HL.hl.getReverseKeywords();
const keyDesc = HL.hl.getKeyDesc();

const keyColors = HL.hl.getKeyColors();

let r = {};
for (let key in keywords) {
  r[keywords[key]] = {
    name: key,
    id: keywords[key],
    text: true,
    value: key,
    color: "#009105",
    desc: keyDesc[keywords[key]],
    error: false,
  };
}

const keyStruct = ref(r);


defineExpose({ keyStruct });

</script>

<template>
  <Dropdown title="Keywords" :struct="keyStruct" class=""></Dropdown>
</template>