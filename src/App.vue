<template>
  <nav>
    <nav-bar />
  </nav>
  <router-view/>
</template>

<script lang="ts" setup>
import NavBar from './components/NavBar.vue';

</script>

<style lang="scss">
@import '@/assets/scss/default.scss';
@import '@/assets/scss/commons.scss';
</style>
