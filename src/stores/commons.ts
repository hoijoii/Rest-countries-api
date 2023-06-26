/* eslint-disable */
import { ref, Ref, reactive } from 'vue'

export const useCommonsStore = () => {
  const data = require('@/assets/data/data.json')
  const regions : Array<string> = reactive([])

  const setRegionSelectList = () : void => {
    data.forEach((country: any) => {
      if(!regions.includes(country.region)) {
        regions.push(country.region)
      }
    });
    regions.sort()
  }

  return { 
    data,
    regions,
    setRegionSelectList
  };
}