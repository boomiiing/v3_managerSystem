<template>
  <svg :style="{ height, width }">
    <use :href="perfix + name"></use>
  </svg>
</template>
<script setup lang="ts" name="SvgIcon">
defineProps({
  perfix: {
    type: String,
    default: '#icon-',
  },
  name: String,
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '24px',
  },
  height: {
    type: String,
    default: '24px',
  },
})
</script>
<style scoped></style>
