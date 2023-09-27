<script setup>
import { ref } from "vue";

import { useRoute } from "vue-router";

let route = useRoute();

const navbarId = ref("");

function toggle() {
  navbarId.value.classList.toggle('is-active');
}

function reset() {
  navbarId.value.classList.remove('is-active')
}


</script>

<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link @click="reset" class="navbar-item has-background-dark" to="/">
        <img id="logo" src="/dist/programming.png" alt="logo" width="112" height="28">
      </router-link>

      <a role="button" class="navbar-burger" @click="toggle" aria-label="menu" aria-expanded="false"
        data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" ref="navbarId" class="navbar-menu has-background-dark">
      <div class="navbar-start">
        <router-link @click="reset" :class="['navbar-item', route.path == '/creator' ? 'has-background-success-dark' : '']"
          to="/creator">
          Creator
        </router-link>

        <router-link @click="reset"
          :class="['navbar-item', route.path == '/playground' ? 'has-background-success-dark' : '']" to="/playground">
          Playground
        </router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown has-background-dark">
            <a class="navbar-item">
              About
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>


<style scoped>
.navbar {
  height: 10%;
  position: fixed;
  width: 100%;
}

.navbar-item,
.navbar-link {
  color: white;
}

a.navbar-item:hover,
.navbar-item:hover,
.navbar-link:hover {
  background-color: rgba(0, 0, 0, 0.327);
  color: white;
}

.navbar-link::after {
  border-color: white;
}

#logo {
  height: 1.75rem;
  width: 1.75rem;
  filter: contrast(0);
}</style>