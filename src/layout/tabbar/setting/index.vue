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
          <el-color-picker
            :teleported="false"
            v-model="color"
            @change="setColor"
          />
        </el-form-item>
        <el-form-item label="主题切换">
          <el-select
            :teleported="false"
            v-model="switchTheme"
            placeholder="主题切换"
            @change="changeTheme"
          >
            <el-option
              v-for="item in themeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
import { ref, onMounted } from 'vue'
import { useLayOutSettingStore } from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useThemeStore } from '@/store/modules/theme'
const userStore = useUserStore()
const themeStore = useThemeStore()
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
let switchTheme = ref<string>('0')
const themeOptions = [
  {
    label: '经典',
    value: '0',
  },
  {
    label: '黑夜',
    value: '1',
  },
  {
    label: '新颖',
    value: '2',
  },
]
const changeTheme = () => {
  let html = document.documentElement
  if (switchTheme.value == '0') {
    html.className = ''
  } else if (switchTheme.value == '1') {
    html.className = 'dark'
  } else if (switchTheme.value == '2') {
    html.className = 'likeTheme'
  }
  themeStore.setTheme(switchTheme.value)
}
const setColor = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
onMounted(() => {
  console.log(themeStore.currentTheme)
  switchTheme.value = themeStore.currentTheme || '0'
  changeTheme()
})
</script>
<style scoped></style>
