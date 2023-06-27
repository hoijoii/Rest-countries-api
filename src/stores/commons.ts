/* eslint-disable */
import { ref, Ref, reactive } from 'vue'
import { getRestCountries } from '@/utils/rest-utils'
import { defineStore } from 'pinia'

export const useCommonsStore = defineStore('commonsStore', {
  state: () => ({
    data: require('@/assets/data/data.json'),
    filterType: '' as string,
    countryList: [] as Array<any>,
  }),
  actions: { 
    getCountryItems(url?:string, params?:any) {
      getRestCountries(url, params)
        .then((res)=>{
          this.countryList = res.data
          this.filterType = 'search'
        })      
    },
  }
})