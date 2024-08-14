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
import { useLayOutSettingStore } from '@/store/modules/setting'
let layOutSettingStore = useLayOutSettingStore()
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
