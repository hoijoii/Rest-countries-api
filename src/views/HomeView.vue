<template>
  <div id="container" class="home">
    <div class="content">
      <div class="filters">
        <search-filter 
          ref="filterRef"
          @search="filteringList"
        />
      </div>

      <div class="list">
        <div v-for="country in countryList" :key="country.name" class="card">
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
import { onMounted, reactive, Ref, ref, computed } from 'vue';
import CountryCard from '@/components/CountryCard.vue';
import SearchFilter from '@/components/SearchFilter.vue'
import { useCommonsStore } from '@/stores/commons'
import _ from 'lodash'

// stores
const commonsStore = useCommonsStore()

// props&emits
const filterRef : Ref<any> = ref(null)

let countryList: Array<any> = reactive(commonsStore.data)

// region
const setRegion = (re:string):void => {
  setCountryListByRegion(re)
}

const setCountryListByRegion = (region?:string):void => {
  region ? 
    countryList = commonsStore.data.filter((country:any) => country.region === region)
    : countryList = commonsStore.data
}

// search keyword
const searchKeyword = computed(()=> filterRef.value?.searchKeyword)

const filteringList = async ():void => {
  console.log(searchKeyword)
  countryList.filter((country:any) => country.name === "Albania")
  /* commonsStore.data.forEach((c:any)=>{
    if (c.name.toLowerCase().includes(searchKeyword.value.toLowerCase())) {
      countryList.push(c)
    }
  })
 */
  console.log(countryList)
}

// lifecycle
onMounted(()=>{
  //console.log(countryList)
})

</script>
