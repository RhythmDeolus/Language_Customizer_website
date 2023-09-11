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
    outputErr() {
      return this.$store.state.a.outputErr;
    },
  },
};
</script>

<template>
  <div class="title title-out is-family-monospace">Output:</div>
  <pre class="output is-family-monospace"><span class="out">{{ output }}</span><span class="out-err">{{ outputErr }}</span></pre>
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

.out-err {
  color: red;
}

.title-out {
  font-size: large;
  height: 5%;
  color: white;
  margin: 0 10px;
}
</style>