<script lang="ts" setup>
const selection = ref('')

const emit = defineEmits(['changeNamKhaoSat'])
const model = defineModel()

const changeSelection = () => {
    emit('changeNamKhaoSat', selection.value)
}
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">Năm khảo sát </span>
        <el-input v-model="model" />
    </div>
</template>