<template>
  <div style="height: 100%">
    <el-card shadow="always" class="main_body">
      <el-row style="height: 20%" class="title">
        <img :src="userStore.avatar" style="height: 150px;  width: 150px; margin: 0 10px; border-radius: 50%">
        <div>
          <div style="font-size: 24px;">{{getTime() + userStore.username}}</div>
          <div style="font-size: 16px;">这是一个管理系统</div>
        </div>
      </el-row>
      <el-row style="height: 80%">
   
      </el-row>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'

const userStore = useUserStore()

</script>
<style scoped lang="scss">
.main_body {
  height: 100%;
  background: #fff;
  .title{
    display: flex;
    align-items: center;
  }
}
::v-deep .el-card__body {
  height: calc(100% - 40px);
}

</style>
