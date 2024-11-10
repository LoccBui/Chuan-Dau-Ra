<script lang="ts" setup>
const selection = ref('')

const emit = defineEmits(['changeInputCLO'])
const model = defineModel()

const changeSelection = () => {
    emit('changeInputCLO', selection.value)
}
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">CLO</span>
        <el-input v-model="model" />
    </div>
</template>