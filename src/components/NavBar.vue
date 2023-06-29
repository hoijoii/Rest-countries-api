<template>
  <div id="navbar">
    <div class="container">
      <div class="wrapper">
        <div class="title" @click="goHome">Where in the world?</div>
        <div class="mode" @click="setMode">
          <ion-icon name="moon-outline" v-if="modeName === 'Dark'"/>
          <ion-icon name="sunny-outline" v-if="modeName === 'Light'" />
          <span class="ml5">{{ modeName + ' Mode' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'

// dark/light mode
const modeName : Ref<string> = ref('Dark')

const setMode = () => {
  if (localStorage.getItem('mode') === 'light') {
    modeName.value = 'Light'
    localStorage.setItem('mode', 'dark')
  }
  else {
    modeName.value = 'Dark'
    localStorage.setItem('mode', 'light')
  }
}

// router
const router = useRouter()
const goHome = () => {
  router.push('/')
}

// lifeCycle
onMounted(()=>{
  localStorage.setItem('mode', 'light')
})

</script>