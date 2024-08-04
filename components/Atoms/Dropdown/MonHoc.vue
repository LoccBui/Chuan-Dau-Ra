<script lang="ts" setup>
import { facultyList } from '~/types/Faculty'

const selection = ref('')

const emit = defineEmits(['changeMonHoc'])

const changeSelection = () => {
    emit('changeMonHoc', selection.value)
}
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">Môn học</span>
        <el-select v-model="selection" placeholder="Chọn mã môn" @change="changeSelection">
            <el-option v-for="(item, index) in facultyList" :key="index" :label="item.name" :value="item.name" />
        </el-select>
    </div>
</template>