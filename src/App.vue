<template>
  <div>
    <h1>维尼熊</h1>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { reqLogin } from './api/user/index'
onMounted(() => {
  reqLogin({
    username: 'admin',
    password: '111111',
  })
})
</script>
<style scoped lang="scss">
div {
  h1 {
    color: $color;
  }
}
</style>
