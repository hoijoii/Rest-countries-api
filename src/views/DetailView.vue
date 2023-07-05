<template>
  <div id="container" class="detail">
    <div class="content">
      <div class="top-btn">
        <button class="back" @click="goBack">
          <ion-icon name="arrow-back-outline" />
          <span>Back</span>
        </button>
      </div>
      <div class="country">
        <div class="flag">
          <img :src="countryDetail.flag">
        </div>
        <div class="info">
          <div class="title">{{ countryDetail.name }}</div>
          <div class="grid">
            <div class="dvs1">
              <div>
                <span>Native Name: </span>
                {{ countryDetail.nativeName }}
              </div>
              <div>
                <span>Population: </span>
                {{ countryDetail.population }}
              </div>
              <div>
                <span>Region: </span>
                {{ countryDetail.region }}
              </div>
              <div>
                <span>Sub Region: </span>
                {{ countryDetail.subregion }}
              </div>
              <div>
                <span>Capital: </span>
                {{ countryDetail.capital }}
              </div>
            </div>
            <div class="dvs2">
              <div>
                <span>Top Level Domain: </span>
                {{ countryDetail.tld }}
              </div>
              <div>
                <span>Currencies: </span>
                {{ countryDetail.currencies }}
              </div>
              <div>
                <span>Languages: </span>
                {{ countryDetail.languages }}
              </div>
            </div>
          </div>
          <div class="bottom">
            <span>Border Countries: </span>
            <div v-if="borders.length" class="borders">
              <div v-for="(b, idx) in borders" :key="idx" class="border">
                <div class="txt">{{ b }}</div>
              </div>
            </div>
            <div v-else class="border">
              <div>None :)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
/* eslint-disable */
import { onMounted, reactive, ref, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommonsStore } from '@/stores/commons'
import { ICountry } from '@/types/country'
import StringUtils from '@/utils/string-utils'
import _ from 'lodash'

const commonsStore = useCommonsStore()
//let countryDetail:Ref<any> = ref(_.cloneDeep(commonsStore.countryDetail))

// string filter
const comma = (value: number | any):string => {
  return StringUtils.comma(value)
}

//route
const route = useRoute()
const router = useRouter()
const goBack = ():void => {
  router.push('/')
}

const init = async () => {
  await commonsStore.getCountryDetail(route.params.name)
}

// country information
const borders : Ref<Array<string>> = ref([])
const setBorders = async () => {
  if(!_.isEmpty(commonsStore.countryDetail) && commonsStore.countryDetail.borders.length !== 0){
    await commonsStore.countryDetail?.borders.forEach((b:string)=>{
      const border :ICountry|any = commonsStore.countryList.find(country=>Object.values(country).includes(b))
      borders.value.push(border ? border.name.common : '')
    })
  }
}

const countryDetail : any = reactive({})
const setCountryDetails = ():any =>{  
  //console.log(!_.isEmpty(commonsStore.countryDetail.languages) ? Object.entries(commonsStore.countryDetail.name.nativeName)[0][1].common : '')
  countryDetail.name = commonsStore.countryDetail.name?.common
  countryDetail.nativeName = !_.isEmpty(commonsStore.countryDetail.name.nativeName) ? Object.entries(commonsStore.countryDetail.name.nativeName)[0][1].common : 'None'
  countryDetail.flag = commonsStore.countryDetail.flags?.png
  countryDetail.capital = !_.isEmpty(commonsStore.countryDetail.capital) ? commonsStore.countryDetail.capital[0] : 'None'
  countryDetail.population = comma(commonsStore.countryDetail.population),
  countryDetail.region = commonsStore.countryDetail.region
  countryDetail.subregion = commonsStore.countryDetail.subregion ? commonsStore.countryDetail.subregion : 'None'
  countryDetail.tld = commonsStore.countryDetail.tld[0]
  countryDetail.currencies = !_.isEmpty(commonsStore.countryDetail.currencies) ? Object.entries(commonsStore.countryDetail.currencies)[0][1].name : 'None'
  countryDetail.languages = !_.isEmpty(commonsStore.countryDetail.languages) ? Object.entries(commonsStore.countryDetail.languages)[0][1] : 'None'
  countryDetail.borders = borders.value
  console.log('countryDetail: ')
  console.log(countryDetail)
}

onMounted(async()=>{
  await init()
  await setBorders()
  setCountryDetails()
})

</script>