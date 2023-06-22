<template>
  <div id="container" class="home">
    <div class="content">
      <div class="filter">
        <div class="search-box">
          <input type="text" class="search filter-design" placeholder="Search for a country..."/>
          <ion-icon name="search" />
        </div>
        <div class="region" ref="select">
          <!-- custom select box -->
          <div class="slct filter-design" @click="selectToggle">
            {{region ? region : 'Filter by Region'}}
            <ion-icon name="caret-down" v-if="!isSelectOpened"/>
            <ion-icon name="caret-up" v-else-if="isSelectOpened"/>
          </div>
          <ul v-if="isSelectOpened">
            <li v-for="(re, idx) in regions" :key="idx" @click="setSelectOpen(re)">{{ re }}</li>
          </ul>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable */
import { onMounted, onUnmounted, reactive, Ref, ref } from 'vue';

// filter by region
const region : Ref<string> = ref('')
const data = require('@/assets/data/data.json')
const regions : Array<string> = reactive([])

const setRegions = ():void => {
  data.forEach((country:any) => {
    if(!regions.includes(country.region)) {
      regions.push(country.region)
    }
  });
  regions.sort()
}

// select box toggle
const isSelectOpened: Ref<boolean> = ref(false)
const selectToggle = ():void => {
  isSelectOpened.value = !isSelectOpened.value
}

const setSelectOpen = (re:string):void => {
  region.value = re
  isSelectOpened.value = false
}

// click outside of select area -> close
const select: Ref<any> = ref(null)
const documentClick = (e:any):void => {
  let el = select.value
  let target = e.target
  if (el !== target && !el.contains(target)) {
    isSelectOpened.value = false
  }
}

// lifecycle
onMounted(()=>{
  setRegions()
  document.addEventListener('click', documentClick)
})

onUnmounted(()=>{
  document.removeEventListener('click', documentClick)
})

</script>
