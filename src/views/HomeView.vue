<template>
  <div id="container" class="home">
    <div class="content">
      <div class="filters">
        <search-bar 
          @search="setListByFilter"
          ref="searchRef"
        />
        <region-select 
          @select="setListByFilter"
          ref="regionRef"
        />
      </div>

      <div class="list" v-if="exData">
        <div v-for="country in (filteredList.length !== 0 ? filteredList : countryList)" 
          :key="country.name" 
          class="card">
          <country-card 
            :flag="country.flags.png"
            :name="country.name"
            :capital="country.capital ? country.capital : ''"
            :region="country.region"
            :population="country.population"
            @click = "goPath(country.name)"
          />
        </div>
      </div>

      <div class="list" v-else-if="!exData">
        <div class="no-results">Sorry, no data match the given condition.</div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable */
import { onMounted, reactive, Ref, ref, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router'
import CountryCard from '@/components/CountryCard.vue';
import SearchBar from '@/components/SearchBar.vue'
import RegionSelect from '@/components/RegionSelect.vue';
import { useCommonsStore } from '@/stores/commons'
import _ from 'lodash'

// stores
const commonsStore = useCommonsStore()

// props&emits
const searchRef : Ref<any> = ref(null)
const regionRef : Ref<any> = ref(null)

// init list
const countryList = require('@/assets/data/data.json')
let filteredList: Ref<Array<any>> = ref([])

// filtering list
const region = computed<Ref<string>>(() => regionRef.value?.region)
const keyword = computed(()=> searchRef.value?.searchKeyword)
const exData : Ref<boolean> = ref(true)

const setListByFilter = ():void => {
  filteredList.value = _.cloneDeep(countryList)
                          .filter((country:any)=> country.name.toLowerCase().includes(keyword.value.toLowerCase()))
                          .filter((country:any)=> region.value ? (country.region === region.value) : true)

  filteredList.value.length === 0 ? exData.value = false : exData.value = true
}

// router
const router = useRouter()
const goPath = (name: string): void => {
  router.push(`/detail/${name}`)
}

// lifecycle
onMounted(()=>{
})

</script>
