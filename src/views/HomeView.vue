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
            <li v-for="(re, idx) in regions" :key="idx" @click="setRegion(re)">{{ re }}</li>
          </ul>
        </div>
      </div>

      <div class="list">
        <div v-for="country in data" :key="country.name">
          <country-card 
            :flag="country.flag"
            :name="country.name"
            :capital="country.capital"
            :region="country.region"
            :population="country.population"
          />
        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable */
import { onMounted, onUnmounted, reactive, Ref, ref } from 'vue';
import CountryCard from '@/components/CountryCard.vue';

const data = require('@/assets/data/data.json')

// filter by region
const region : Ref<string> = ref('')
const regions : Array<string> = reactive([])

const setRegionSelectList = ():void => {
  data.forEach((country:any) => {
    if(!regions.includes(country.region)) {
      regions.push(country.region)
    }
  });
  regions.sort()
}

// select box toggle
const isSelectOpened: Ref<boolean> = ref(false)
let countryList: Array<any> = reactive(data)

const selectToggle = ():void => {
  isSelectOpened.value = !isSelectOpened.value
}

const setRegion = (re:string):void => {
  region.value = re
  isSelectOpened.value = false
  setCountryList(re)
}


const setCountryList = (region?:string):void => {
  region ? 
    countryList = data.filter((country:any) => country.region === region)
    : countryList = data
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
  setRegionSelectList()
  document.addEventListener('click', documentClick)
  console.log(countryList)
})

onUnmounted(()=>{
  document.removeEventListener('click', documentClick)
})

</script>
