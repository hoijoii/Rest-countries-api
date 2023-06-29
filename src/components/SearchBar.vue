<template>
  <div class="filter">
    <div class="search-box">
      <input type="text" v-model="searchKeyword" class="search filter-design" placeholder="Search for a country..."/>
      <ion-icon name="search" />
    </div>
  </div>
</template>

<script setup lang='ts'>
/* eslint-disable */
import { Ref, ref } from 'vue';
import _ from 'lodash'

// props & emits
const emit = defineEmits(['search'])

// search
const searchKeyword : Ref<string> = ref('')

defineExpose({
  searchKeyword
})

document.addEventListener('keyup', (e:any) => {
  if (e.code === 'Enter') {
    emit('search')
  }
})

</script>