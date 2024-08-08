<template>
  <div class="layout_container">
    <div class="layout_menu">
      <h5 class="mb-2">
        <svg-icon :name="setting.logo" height="40px" width="40px"></svg-icon>
        <p>{{ setting.title }}</p>
      </h5>
      <el-scrollbar class="scroll_bar">
        <el-menu
          background-color="#545c64"
          style="width: 100%; border: none"
          text-color="#fff"
          router="true"
          :default-active="$route.path"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar"></div>
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>
<script setup lang="ts" name="Layout">
import setting from '@/setting'
import Menu from '@/layout/menu/index.vue'
import useUserStore from '@/store/modules/user'
import Main from '@/layout/main/index.vue'
import { useRoute } from 'vue-router'
let userStore = useUserStore()
let $route = useRoute()
console.log($route.path)
</script>
<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: #ccc;
  .layout_menu {
    height: 100%;
    width: $base_menu_width;
    background: $base_menu_background;
    .mb-2 {
      margin: 0;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      p {
        font-size: 24px;
        color: #fff;
      }
    }
    .scroll_bar {
      height: calc(100% - 50px);
    }
  }
  .layout_tabbar {
    position: absolute;
    right: 0;
    top: 0;
    height: $base_tabbar_height;
    width: calc(100% - $base_menu_width);
    background-color: #094;
  }
  .layout_main {
    position: absolute;
    bottom: 0;
    right: 0;
    width: calc(100% - $base_menu_width);
    height: calc(100% - $base_tabbar_height);
    padding: 10px;
    overflow: auto;
    box-sizing: border-box;
  }
}
</style>
