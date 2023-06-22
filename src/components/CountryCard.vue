<template>
  <div id="card">
    <img :src="flag" class="flag">
    <div class="info">
      <div class="title">{{ name }}</div>
      <div class="description">
        <ul>
          <li><span>Population: </span> {{ comma(population) }}</li>
          <li><span>Region: </span>{{ region }}</li>
          <li><span>Capital: </span>{{ capital }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, defineProps } from 'vue';
import StringUtils from '@/utils/string-utils'

// props & emit
const props = defineProps({
  flag: String,
  name: String,
  capital: String,
  region: String,
  population: Number,
}) 

// string filter
const comma = (value: number | any):string => {
  return StringUtils.comma(value)
}

</script>