<script lang="ts" setup>
import { facultyList } from '~/types/Faculty'

const selection = ref('')
const fetchStore = useFetchStore()

const emit = defineEmits(['changeCTDT'])

const { data: listFaculties, pending } = await fetchStore.fetchCTDT()


const changeSelection = () => {
    emit('changeCTDT', selection.value)
}
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">Chương trình đào tạo</span>
        <el-select v-model="selection" placeholder="Chọn chương trình đào tạo" @change="changeSelection">
            <el-option v-for="(item, index) in facultyList" :key="index" :label="item.name" :value="item.name" />
        </el-select>
    </div>
</template>