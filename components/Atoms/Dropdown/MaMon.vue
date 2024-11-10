<script lang="ts" setup>
const selection = ref('')

const emit = defineEmits(['changeMaMon'])
const input = ref('')

const changeSelection = () => {
    emit('changeMaMon', selection.value)
}
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">Mã môn</span>
        <el-input v-model="input" />
    </div>
</template>