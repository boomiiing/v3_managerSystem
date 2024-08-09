<template>
  <el-icon @click="changeIcon">
    <component :is="layOutSettingStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight" style="margin-left: 10px">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item>promotion management</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts" name="Breadcrumb">
import { useLayOutSettingStore } from '@/store/modules/setting'
const layOutSettingStore = useLayOutSettingStore()
const changeIcon = () => {
  layOutSettingStore.fold = !layOutSettingStore.fold
}
</script>
<style scoped></style>
