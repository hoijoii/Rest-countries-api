/* eslint-disable */
import { ref, Ref, reactive } from 'vue'
import { getRestCountries } from '@/utils/rest-utils'
import { defineStore } from 'pinia'

export const useCommonsStore = defineStore('commonsStore', {
  state: () => ({
    countryList: [] as Array<any>,
    countryDetail: {}
  }),
  actions: { 
    getCountryList() { 
      getRestCountries('/all')
        .then((res:any)=>{
          this.countryList = res.data
        })
    },
    getCountryDetail(name:string) {
      getRestCountries('/name', name)
        .then((res:any) => {
          this.countryDetail = res.data[0]
          console.log(res.data[0])
        })
    }
  }
})