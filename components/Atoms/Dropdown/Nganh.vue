<script lang="ts" setup>
import _ from 'lodash'

const selection = ref('')
const fetchStore = useFetchStore()
const emit = defineEmits(['changeNganh'])

watch(
    () => fetchStore.khoaSelection,
    () => {
        console.log('watch khoa change');
        selection.value = fetchStore.faculties[0]
        changeSelection()
    },
    {
        deep: true
    }
)

const changeSelection = () => {
    fetchStore.nganhSelection = selection.value
    const nganhDataSelections = fetchStore.getNganhByKhoa.programs.find((nganh) => nganh.name === selection.value)
    emit('changeNganh', nganhDataSelections)
}
</script>

<template>
    <div class="flex items-center gap-10">

        <span class="min-w-60">Ngành</span>
        <el-select v-model="selection" placeholder="Chọn ngành" @change="changeSelection">
            <el-option v-for="item in _.get(fetchStore.getNganhByKhoa, 'programs', [])" :key="item.id"
                :label="item.name" :value="item.name" />
        </el-select>
    </div>
</template>