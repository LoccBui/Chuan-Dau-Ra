<script lang="ts" setup>
import { useDebounce, useDebounceFn } from '@vueuse/core'

const inputValue = ref('')

const emit = defineEmits(['changeInput'])

const debounced = useDebounce(inputValue, 1000)

const changeInput = () => {
    emit('changeInput', inputValue.value)
}

const debouncedTest = useDebounceFn(changeInput, 1000)
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">Điểm cần đạt</span>
        <el-input @keyup="debouncedTest" v-model="inputValue" placeholder="Nhập điểm cần đạt" />
    </div>
</template>
