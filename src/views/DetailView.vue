<template>
  <div id="container" class="detail">
    <div class="content">
      <div class="top-btn">
        <button class="back" @click="goBack">
          <ion-icon name="arrow-back-outline" />
          <span>Back</span>
        </button>
      </div>
      <div class="texts">
        <div class="flag">
          <img :src="countryDetail.flags?.png">
        </div>
        <div class="info">
          <div class="title">{{ countryDetail.name?.common }}</div>
          <div class="grid">
            <div class="dvs1">
              <div>
                <span>Native Name: </span>
                {{ countryDetail.name?.nativeName?.ara?.common }}
              </div>
              <div>
                <span>Population: </span>
                {{ comma(countryDetail.population) }}
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
                {{ countryDetail.capital ? countryDetail.capital[0] : '' }}
              </div>
            </div>
            <div class="dvs2">
              <div>
                <span>Top Level Domain: </span>
                {{ countryDetail.tld ? countryDetail.tld[0] : '' }}
              </div>
              <div>
                <span>Currencies: </span>
                {{ countryDetail.currencies}}
              </div>
              <div v-if="countryDetail.languages">
                <span>Languages: </span>
                {{ countryDetail.languages }}
              </div>
            </div>
          </div>
          <div class="countries">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
/* eslint-disable */
import { onMounted, ref, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommonsStore } from '@/stores/commons'
import { getRestCountries } from '@/utils/rest-utils'
import StringUtils from '@/utils/string-utils'
import _ from 'lodash'

const commonsStore = useCommonsStore()
//let countryDetail:Ref<any> = ref(_.cloneDeep(commonsStore.countryDetail))

// string filter
const comma = (value: number | any):string => {
  return StringUtils.comma(value)
}

const route = useRoute()
const router = useRouter()
const goBack = ():void => {
  router.push('/')
}

const countryDetail : Ref<any> = ref({})
const init = async () => {
  await getRestCountries('/name', route.params.name)
    .then((res:any) => {
      console.log(res.data[0])
      countryDetail.value = res.data[0]
    })
}

onMounted(()=>{
  init()
})

</script>