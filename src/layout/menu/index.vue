<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <el-menu-item v-if="!item.children" :index="item.path">
      <!-- <el-icon><setting /></el-icon> -->
      <template #title>
        <span></span>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-menu-item
      v-else-if="
        item.children && item.children.length == 1 && !item.children[0].children
      "
      :index="item.path"
    >
      <!-- <el-icon><setting /></el-icon> -->
      <template #title>
        <span></span>
        <span>{{ item.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu
      v-else-if="
        item.children &&
        item.children.length == 1 &&
        item.children[0].children &&
        item.children[0].children.length > 0
      "
      :index="item.path"
    >
      <template #title>
        <!-- <el-icon><location /></el-icon> -->
        <span>{{ item.children[0].meta.title }}</span>
      </template>
      <Menu :menuList="item.children[0].children"></Menu>
    </el-sub-menu>
    <el-sub-menu v-else :index="item.path">
      <template #title>
        <!-- <el-icon><location /></el-icon> -->
        <span>{{ item.name }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>
<script setup lang="ts" name="Menu">
defineProps(['menuList'])
</script>
<style scoped></style>
