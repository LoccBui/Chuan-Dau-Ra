<script lang="ts" setup>
const model = defineModel()
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">Tên</span>
        <el-input placeholder="Nhập tên" v-model="model" />
    </div>
</template>