<script lang="ts" setup>
import { useDebounce, useDebounceFn } from '@vueuse/core'

const model = defineModel()
const emit = defineEmits(['changeMaMon'])
const debounced = useDebounce(model, 1000)

const changeInput = () => {
    emit('changeMaMon', model.value)
}

const debouncedInput = useDebounceFn(changeInput, 1000)
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">Mã môn </span>
        <el-input @keyup="debouncedInput" v-model="model" />
    </div>
</template>