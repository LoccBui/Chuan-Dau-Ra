<script lang="ts" setup>
import { facultyList } from '~/types/Faculty'

const selection = ref('')

const emit = defineEmits(['changeCLO'])

const changeSelection = () => {
    emit('changeCLO', selection.value)
}
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">CLO</span>
        <el-select v-model="selection" placeholder="Chọn CLO" @change="changeSelection">
            <el-option v-for="(item, index) in facultyList" :key="index" :label="item.name" :value="item.name" />
        </el-select>
    </div>
</template>