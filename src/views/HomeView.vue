<template>
  <div id="container" class="home">
    <div class="content">
      <div class="filter">
        <div class="search-box">
          <input type="text" class="search filter-design" placeholder="Search for a country..."/>
          <ion-icon name="search" />
        </div>
        <div class="region">
          <select v-model="region" required class="slct filter-design">
            <option value="" hidden selected>Filter by Region</option>
            <option v-for="(re, idx) in regions" :key="idx" :value="re">{{ re }}</option>
          </select>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable */
import { onMounted, reactive, Ref, ref } from 'vue';

const region : Ref<string> = ref('')

// filter by region
const data = require('@/assets/data/data.json')
const regions : Array<string> = reactive(['Filter by Region'])

const setRegions = ():void => {
  data.forEach((country:any) => {
    if(!regions.includes(country.region)) {
      regions.push(country.region)
    }
  });
  regions.sort()
}

// lifecycle
onMounted(()=>{
  setRegions()
})

</script>
