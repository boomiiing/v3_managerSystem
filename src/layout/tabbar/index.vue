<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>
<script setup lang="ts" name="Tabbar">
import Setting from '@/layout/tabbar/setting/index.vue'
import Breadcrumb from '@/layout/tabbar/breadcrumb/index.vue'
</script>
<style scoped lang="scss">
.tabbar {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tabbar_left {
    display: flex;
    margin-left: 20px;
  }
  .tabbar_right {
    display: flex;
    margin-right: 20px;
    align-items: center;
  }
}
</style>
