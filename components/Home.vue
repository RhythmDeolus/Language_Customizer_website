<script setup>


</script>

<template>
  <div class="container1">
    <div class="main-title">
      <div class="title is-large has-text-success is-1">
        Language Customizer
      </div>
    </div>
    <div class="items">
      <div class="item">
        <router-link to="/creator" class="button is-success is-outlined is-large">Creator</router-link>
      </div>
      <div class="item">
        <router-link to="/playground" class="button is-success is-outlined is-large">Playground</router-link>
      </div>
    </div>
    <div class="links">
      <a href="https://github.com/RhythmDeolus/Language_Customizer"><img src="/dist/github.png" alt="github"></a>
      <a href="https://github.com/RhythmDeolus/Language_Customizer"><img src="/dist/linkedin.png" alt="linkedin"></a>
    </div>
  </div>
</template>

<script>
// geting canvas by Boujjou Achr
</script>

<style scoped>
.container1 {
  width: 100%;
  height: 100%;
  z-index: 2;
  position: relative;
}

.main-title {
  width: 100%;
  height: 30%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.75rem;
}

.title {
  margin: 0;
  height: fit-content;
}

.items {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  width: 100%;
}

.links {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  height: 10%;
}

.links>a {
  height: 60%;
  width: auto;
  display: block;
  margin: 0 1rem;
}

.links>a>img {
  height: 100%;
  width: auto;
  filter: contrast(0);
}

.item {
  margin: 0 2rem;
  width: 30%;
}

.item>* {
  width: 100%;
}
</style>