<script lang="ts" setup>
const model = defineModel()
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">Niên khóa</span>
        <el-input v-model="model" type="number" placeholder="Nhập niên khóa" />
    </div>
</template>