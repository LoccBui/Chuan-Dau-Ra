<script lang="ts" setup>
const emit = defineEmits(['addClicked'])
</script>

<template>
    <el-button type="primary" @click="emit('addClicked')"> Thêm </el-button>
</template>