<script>
import { computed } from "vue";

// let output = computed({() => {
//     return this.$store.state.output;
// }});
export default {
  computed: {
    output() {
      return this.$store.state.a.output;
    },
  },
};
</script>

<template>
  <div class="title title-out">Output:</div>
  <pre class="output">{{ output }}</pre>
</template>

<style scoped>
.output {
  display: block;
  width: calc(100% - 20px);
  background-color: black;
  color: green;
  min-height: 100px;
  border-radius: 10px;
  padding: 10px;
  height: 25%;
  margin: 0 10px;
  font-size: large;
}

.title-out {
  font-size: large;
  height: 5%;
  color: white;
  margin: 0 10px;
}
</style>