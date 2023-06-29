<template>
  <div class="region" ref="select">
      <!-- custom select box -->
      <div class="slct filter-design" @click="selectToggle">
        {{region ? region : 'Filter by Region'}}
        <ion-icon name="caret-down" v-if="!isSelectOpened"/>
        <ion-icon name="caret-up" v-else-if="isSelectOpened"/>
      </div>
      <ul v-if="isSelectOpened">
        <li v-for="(re, idx) in regions" :key="idx" @click="setRegion(re)">{{ re }}</li>
      </ul>
  </div>
</template>

<script setup lang='ts'>
/* eslint-disable */
import { onMounted, onUnmounted, ref, Ref } from 'vue';

// props & emits
const emit = defineEmits(['select'])

// select box toggle
const isSelectOpened: Ref<boolean> = ref(false)

const selectToggle = ():void => {
  isSelectOpened.value = !isSelectOpened.value
}

// region select box
const regions : Array<string> = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
const region : Ref<string> = ref('')

const setRegion = (re:string):void => {
  region.value = re
  isSelectOpened.value = false
  emit('select')
}

defineExpose({
  region
})

// click outside of select area -> close
const select: Ref<any> = ref(null)

const documentClick = (e:any):void => {
  let el = select.value
  let target = e.target
  if (el !== target && !el.contains(target)) {
    isSelectOpened.value = false
  }
}

// lifeCycle
onMounted(()=>{
  document.addEventListener('click', documentClick)
})

onUnmounted(()=>{
  document.removeEventListener('click', documentClick)
})

</script>