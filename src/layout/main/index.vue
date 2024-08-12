<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component
          :is="Component"
          :key="layOutSettingStore.refresh"
        ></component>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts" name="Main">
// import {ref,watch,nextTick} from 'vue'
import { useLayOutSettingStore } from '@/store/modules/setting'
let layOutSettingStore = useLayOutSettingStore()
// let flag = ref(true)
// watch(()=>layOutSettingStore.refresh,() => {
//   flag.value = false
//   nextTick(()=>{
//     flag.value = true
//   })
// })
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
