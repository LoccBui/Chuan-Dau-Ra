<script lang="ts" setup>
const model = defineModel()
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">Mã sinh viên</span>
        <el-input placeholder="Nhập mã sinh viên" v-model="model" />
    </div>
</template>