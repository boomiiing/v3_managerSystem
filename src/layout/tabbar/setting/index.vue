<template>
  <div>
    <el-button size="small" icon="Refresh" circle @click="updateRefsh" />
    <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
    <el-popover placement="bottom" title="Title" :width="300" trigger="hover">
      <template #reference>
        <el-button size="small" icon="Setting" circle />
      </template>
      <el-form ref="form" label-width="80px">
        <el-form-item label="主题颜色">
          <el-color-picker v-model="color" />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            v-model="switchTheme"
            inline-prompt
            active-icon="moon"
            inactive-icon="sunny"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeTheme"
          ></el-switch>
        </el-form-item>
      </el-form>
    </el-popover>
    <img
      :src="userStore.avatar"
      style="height: 24px; width: 24px; margin: 0 10px; border-radius: 50%"
    />
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="CloseBold" @click="userLogout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts" name="Setting">
import { ref } from 'vue'
import { useLayOutSettingStore } from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
import { useRouter } from 'vue-router'
let layOutSettingStore = useLayOutSettingStore()
let $router = useRouter()
function updateRefsh() {
  layOutSettingStore.refresh = !layOutSettingStore.refresh
}
function fullScreen() {
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
async function userLogout() {
  await userStore.userLogout()
  $router.replace({ path: '/login' })
}
let color = ref()
let switchTheme = ref(false)
const changeTheme = () => {
  let html = document.documentElement
  switchTheme.value ? (html.className = 'dark') : (html.className = '')
}
</script>
<style scoped></style>
