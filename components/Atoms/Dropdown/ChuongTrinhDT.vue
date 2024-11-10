<script lang="ts" setup>
import _ from 'lodash'

const selection = ref('')
const fetchStore = useFetchStore()
const emit = defineEmits(['changeCTDT'])

watch(
    () => fetchStore.khoaSelection,
    () => {
        selection.value = _.get(fetchStore, 'getCTDTbyNganh[0].id', 0)
        changeSelection()
    }
)

const changeSelection = () => {
    emit('changeCTDT', selection.value)
}
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">Chương trình đào tạo</span>

        <el-select v-model="selection" placeholder="Chọn chương trình đào tạo" @change="changeSelection">
            <el-option v-for="item in _.get(fetchStore, 'getCTDTbyNganh', [])" :key="item.id" :label="item.name"
                :value="item.id" />
        </el-select>

    </div>
</template>