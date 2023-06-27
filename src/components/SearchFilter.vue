<template>
  <div class="filter">
    <div class="search-box">
      <input type="text" v-model="searchKeyword" class="search filter-design" placeholder="Search for a country..."/>
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
        <li v-for="(re, idx) in commonsStore.regions" :key="idx" @click="setRegion(re)">{{ re }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang='ts'>
/* eslint-disable */
import { onMounted, onUnmounted, reactive, Ref, ref } from 'vue';
import { useCommonsStore } from '@/stores/commons'

// stores
const commonsStore = useCommonsStore()

// props & emits
const emit = defineEmits(['search'])

// select box toggle
const isSelectOpened: Ref<boolean> = ref(false)

const selectToggle = ():void => {
  isSelectOpened.value = !isSelectOpened.value
}

// search
const searchKeyword : Ref<string> = ref('')

document.addEventListener('keyup', (e:any) => {
  if (e.code === 'Enter') {
    emit('search')
  }
})

// filter by region
const region : Ref<string> = ref('')

const setRegion = (re:string):void => {
  region.value = re
  isSelectOpened.value = false
  //setCountryList(re)
}

defineExpose({
  searchKeyword, region
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
  commonsStore.setRegionSelectList()
  document.addEventListener('click', documentClick)
})

onUnmounted(()=>{
  document.removeEventListener('click', documentClick)
})

</script>