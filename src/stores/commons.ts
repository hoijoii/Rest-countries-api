/* eslint-disable */
import { ref, Ref, reactive } from 'vue'
import { getRestCountries } from '@/utils/rest-utils'
import { defineStore } from 'pinia'

export const useCommonsStore = defineStore('commonsStore', {
  state: () => ({
    countryList: require('@/assets/data/data.json'),
    filteredList: [] as Array<any> // list filtered by region
  }),
  actions: { 
  }
})