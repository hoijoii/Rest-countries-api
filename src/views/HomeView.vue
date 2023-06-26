<template>
  <div id="container" class="home">
    <div class="content">
      <div class="filters">
        <search-filter />
      </div>

      <div class="list">
        <div v-for="country in commonsStore.data" :key="country.name" class="card">
          <country-card 
            :flag="country.flag"
            :name="country.name"
            :capital="country.capital"
            :region="country.region"
            :population="country.population"
            class=""
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
import SearchFilter from '@/components/SearchFilter.vue'
import { useCommonsStore } from '@/stores/commons'

// stores
const commonsStore = useCommonsStore()

let countryList: Array<any> = reactive(commonsStore.data)

const setRegion = (re:string):void => {
  setCountryList(re)
}

const setCountryList = (region?:string):void => {
  region ? 
    countryList = commonsStore.data.filter((country:any) => country.region === region)
    : countryList = commonsStore.data
}

// lifecycle
onMounted(()=>{
  console.log(countryList)
})

</script>
