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
    </div>
    <div :class="[isActive ? activeClass : inActiveClass, 'list']">
      <div
        v-for="item in props.struct"
        :key="item.id"
        class="list-item columns_or "
      >
        <label
          :for="item.id"
          class="label is-small column_or hint--bottom is-family-monospace"
          v-tippy="item.desc"
          :style="item.color? `color: ${item.color}`: ''" 
          >{{ item.name }}</label
        >
        <input
          :class="['text-field is-small input column_or is-family-monospace', struct[item.id].error? 'is-danger': '']"
          :name="item.id"
          v-if="item.text"
          type="text"
          :value="item.value"
          @input="
            (event) =>
              (props.struct[event.target.name].value = event.target.value)
          "
        />
        <input
          type="checkbox"
          :id="item.id"
          :name="item.name"
          v-if="item.check"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.drop-title {
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
}
.list {
  transition: 0.5s ease-in-out;
  transition-property: max-height;
  overflow: hidden;
  display: block;
}

.dropdown1 {
  border-radius: 0.6rem;

}

.text-field {
  text-align: center;
}

.list-item {
  margin: 0.75rem 0;
}

.columns_or {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  width: 100%;
}

.column_or {
  width: 30%;
}

.inactive {
  max-height: 0;
  padding: 0;
}

.label {
  text-align: center;
}

.active {
  max-height: 1000px;
  border: 1px solid #7a7a7a;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
}
</style>