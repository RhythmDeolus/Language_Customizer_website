<script setup>
import { ref } from "vue";
let props = defineProps(["title", "struct", "changefun"]);


const isActive = ref(false);
const activeClass = ref("active");
const inActiveClass = ref("inactive");


function toggle() {
  isActive.value = !isActive.value;
}
</script>


<template>
  <div class="dropdown1 has-background-dark">
    <div @click="toggle" class="drop-title lctitle is-5 has-text-white-ter p-4 is-family-monospace">
      {{ props.title }}
      <div :class="['drop-arrow', isActive ? 'active' : 'inactive']"><img src="/dist/right-arrow.png"
          alt="dropdown arrow">
      </div>
    </div>
    <div :class="[isActive ? activeClass : inActiveClass, 'list']">
      <div v-for="item in props.struct" :key="item.id" class="list-item columns_or ">
        <label :for="item.id" class="label is-small column_or hint--bottom is-family-monospace" v-tippy="item.desc"
          :style="item.color ? `color: ${item.color}` : ''">{{ item.name }}</label>
        <input
          :class="['text-field is-small input column_or is-family-monospace has-background-dark', struct[item.id].error ? 'is-danger' : '']"
          :name="item.id" v-if="item.text" type="text" :value="item.value" @input="(event) =>
            (props.struct[event.target.name].value = event.target.value)
            " />
        <input type="checkbox" :id="item.id" :name="item.name" v-if="item.check" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.drop-title {
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  position: relative;
  text-align: center;
}

.drop-arrow {
  position: absolute;
  height: 1rem;
  width: 1rem;
  transform-origin: 50% 50%;
  transition: 0.5s ease-in-out;
  right: 1rem;
  top: calc(50% - 0.5rem);
}

.drop-title:hover {
  cursor: pointer;
}

.drop-arrow>img {
  filter: contrast(0.1);
}

.drop-arrow.active {
  transform: rotateZ(90deg);
}

.drop-arrow.inactive {
  transform: rotateZ(0deg);
}

.list {
  transition: 0.5s ease-in-out;
  transition-property: max-height;
  overflow: hidden;
  display: block;
}

.dropdown1 {
  border-radius: 0.6rem;
  max-width: 800px;
  left: 50%;
  position: relative;
  transform: translate(-50%, 0);
}

.text-field {
  text-align: center;
  color: white;
  background: #6a6a6a57 !important;
  max-width: 100px;
}

.text-field:not(.is-danger) {
  border-color: green;
}

.list-item {
  padding: 0.75rem 0;
}

.columns_or {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  width: 100%;
}

.list-item:nth-child(even) {
background-color: #6a6a6a1c;
}

.column_or {
  width: 30%;
}

.list.inactive {
  max-height: 0;
  padding: 0;
}

.label {
  text-align: center;
  max-width: 100px;
}

.list.active {
  max-height: 1000px;
  border: 1px solid #7a7a7a;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
}
</style>