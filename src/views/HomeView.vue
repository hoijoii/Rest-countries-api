<template>
  <div id="container" class="home">
    <div class="content">
      <div class="filters">
        <search-filter 
          ref="filterRef"
        />
      </div>

      <div class="list">
        <div v-for="country in (commonsStore.filteredList.length!==0 ? commonsStore.filteredList : commonsStore.countryList)" 
          :key="country.name" 
          class="card">
          <country-card 
            :flag="country.flags.png"
            :name="country.name.common"
            :capital="country.capital ? country.capital[0] : ''"
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
import { onMounted, reactive, Ref, ref, computed, onBeforeMount } from 'vue';
import CountryCard from '@/components/CountryCard.vue';
import SearchFilter from '@/components/SearchFilter.vue'
import { useCommonsStore } from '@/stores/commons'
import _ from 'lodash'
import { getRestCountries } from '@/utils/rest-utils';

// stores
const commonsStore = useCommonsStore()

// props&emits
const filterRef : Ref<any> = ref(null)

// region
/* const setRegion = (re:string):void => {
  setCountryListByRegion(re)
}

const setCountryListByRegion = (region?:string):void => {
  region ? 
    countryList = commonsStore.data.filter((country:any) => country.region === region)
    : countryList = commonsStore.data
} */

// lifecycle
onMounted(()=>{
  commonsStore.getCountryItems('/all')
})

</script>
