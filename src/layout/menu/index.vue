<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <template v-if="!item.children">
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
        
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template
      v-else-if="
        item.children && item.children.length == 1 && !item.children[0].children
      "
    >
        <el-menu-item :index="item.path" v-if="!item.children[0].meta.hidden"  >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template
      v-else-if="
        item.children &&
        item.children.length == 1 &&
        item.children[0].children &&
        item.children[0].children.length > 0
      "
    >
      <el-sub-menu :index="item.path" v-if="!item.children[0].meta.hidden"  >
        <template #title>
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
        <Menu :menuList="item.children[0].children"></Menu>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-sub-menu v-if="!item.meta.hidden" :index="item.path"  >
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>
<script setup lang="ts" name="Menu">
defineProps(['menuList'])
</script>
<style scoped></style>
