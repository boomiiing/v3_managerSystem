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
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
          <!-- <el-menu-item index="1">
            <template #title>
              <el-icon><HomeFilled /></el-icon>
              <span>首页</span>
            </template>
          <el-menu-item index="2">
            <el-icon><DataBoard /></el-icon>
            <span>数据大屏</span>
          </el-menu-item>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Lock /></el-icon>
              <span>权限管理</span>
            </template>
            <el-menu-item index="3-1">用户管理</el-menu-item>
            <el-menu-item index="3-2">角色管理</el-menu-item>
            <el-menu-item index="3-3">菜单管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><Goods /></el-icon>
              <span>商品管理</span>
            </template>
            <el-menu-item index="4-1">item one</el-menu-item>
            <el-menu-item index="4-2">item two</el-menu-item>
          </el-sub-menu> -->
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar"></div>
    <div class="layout_main">
      <div class="info"></div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Layout">
import setting from '@/setting'
import Menu from '@/layout/menu/index.vue'
import {
  HomeFilled,
  Lock,
  DataBoard,
  Goods
} from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()
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
    background-color: plum;
    padding: 10px;
    overflow: auto;
    box-sizing: border-box;
    .info {
      width: 100%;
      height: 1000px;
      background-color: #fff;
    }
  }
}
</style>
