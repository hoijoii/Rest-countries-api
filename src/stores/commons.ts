/* eslint-disable */
import { ref, Ref, reactive } from 'vue'
import { getRestCountries } from '@/utils/rest-utils'
import { defineStore } from 'pinia'

export const useCommonsStore = defineStore('commonsStore', {
  state: () => ({
    countryList: [] as Array<any>,
    filteredList: [] as Array<any> // list filtered by region
  }),
  actions: { 
    getCountryItems(url?:string, params?:any) {
      getRestCountries(url, params)
        .then((res)=>{
          this.countryList = res.data
        })
    },
  }
})