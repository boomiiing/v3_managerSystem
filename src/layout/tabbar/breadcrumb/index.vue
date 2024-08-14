<template>
  <div>
    <el-icon @click="changeIcon">
      <component :is="layOutSettingStore.fold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight" style="margin-left: 10px">
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="(item, index) in $route.matched"
        :key="index"
        v-show="item.meta.title"
      >
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts" name="Breadcrumb">
import { useLayOutSettingStore } from '@/store/modules/setting'
import { useRoute } from 'vue-router'
const layOutSettingStore = useLayOutSettingStore()
const changeIcon = () => {
  layOutSettingStore.fold = !layOutSettingStore.fold
}
let $route = useRoute()
</script>
<style scoped></style>
