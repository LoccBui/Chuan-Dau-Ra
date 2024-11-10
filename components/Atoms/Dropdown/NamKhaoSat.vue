<script lang="ts" setup>
import { yearsList } from '~/types/Years'

const selection = ref('')

const emit = defineEmits(['changeNamKhaoSat'])

const changeSelection = () => {
    emit('changeNamKhaoSat', selection.value)
}
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">Năm khảo sát</span>
        <el-select v-model="selection" placeholder="Chọn năm khảo sát" @change="changeSelection">
            <el-option v-for="(item, index) in yearsList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
    </div>
</template>