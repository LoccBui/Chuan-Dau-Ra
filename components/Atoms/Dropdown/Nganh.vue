<script lang="ts" setup>
import { facultyList } from '~/types/Faculty'

const selection = ref('')

const emit = defineEmits(['changeNganh'])

const changeSelection = () => {
    emit('changeNganh', selection.value)
}
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">Ngành</span>
        <el-select v-model="selection" placeholder="Chọn ngành" @change="changeSelection">
            <el-option v-for="(item, index) in facultyList" :key="index" :label="item.name" :value="item.name" />
        </el-select>
    </div>
</template>