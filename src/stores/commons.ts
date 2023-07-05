/* eslint-disable */
import { defineStore } from 'pinia'
import { ref, Ref, reactive } from 'vue'
import { getRestCountries } from '@/utils/rest-utils'
import { ICountry } from '@/types/country'

export const useCommonsStore = defineStore('commonsStore', ()=>{
  const countryList : Ref<Array<ICountry>> = ref([])
  const countryDetail : Ref<ICountry|any> = ref({})

  const getCountryList = async() => {
    try {
      await getRestCountries('/all')
        .then((res:any) => {
          countryList.value = res.data
        })
    } catch(err) {
      console.error(err)
    }
  }

  const getCountryDetail = async (name:string|any) => {
    try {
      await getRestCountries('/name', name.toLowerCase())
        .then((res:any) => {
          countryDetail.value = res.data[0]
          console.log('store:')
          console.log(countryDetail.value)
        })
    } catch (err) {
      console.error(err)
    }
  }

  return {
    countryList,
    countryDetail,
    getCountryList,
    getCountryDetail
  }
}

/* {
  state: () => ({
    countryList: [] as Array<ICountry>,
    countryDetail: {} as ICountry
  }),
  actions: { 
    async getCountryList() { 
      try {
        await getRestCountries('/all')
          .then((res:any)=>{
            this.countryList = res.data
        })
      }
      catch (err) {
        console.error(err)
      }
    },
    async getCountryDetail(name:string|any) {
      try { 
        await getRestCountries('/name', name.toLowerCase())
          .then((res:any) => {
            this.countryDetail = res.data[0]
            console.log('store:')
            console.log(this.countryDetail)
          })
      }
      catch (err) {
        console.error(err)
      }
    }
  }} */
)