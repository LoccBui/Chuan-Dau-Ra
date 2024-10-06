<script lang="ts" setup>
import _ from 'lodash'

const selection = ref('')
const fetchStore = useFetchStore()
const emit = defineEmits(['changeNganh'])

const listItems = ref('')

watch(
    () => fetchStore.khoaSelection,
    () => {
        selection.value = '' // reset
        selection.value = fetchStore.faculties[0]
        console.log(selection.value);
        console.log('list fetchStore.faculties', fetchStore.faculties);
        changeSelection()
    }
)

const changeSelection = () => {
    fetchStore.nganhSelection = selection.value
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