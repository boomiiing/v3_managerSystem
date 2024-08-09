<template>
      <el-button size="small" icon="Refresh" circle />
      <el-button size="small" icon="FullScreen" circle />
      <el-button size="small" icon="Setting" circle />
      <img src="@/assets/images/phote.jpg" style="height:24px;width: 24px; margin:0 10px" />
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          Admin<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="CloseBold">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
</template>
<script setup lang="ts" name="Setting">
</script>
<style  scoped>

</style>
