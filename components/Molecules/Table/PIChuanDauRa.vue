<script lang="ts" setup>
import _ from 'lodash'

export interface Props {
    items: Array<Props>
}

const props = withDefaults(defineProps<Props>(), {
    items: () => []
})

const fetch = useFetchStore()
const modalState = ref<boolean>(false)
const modalDelete = ref<boolean>(false)
const modalAdd = ref<boolean>(false)
const ploIDSelection = computed(() => _.get(props, 'items[0].id', ''))
const selectionPI = ref(null)

const emit = defineEmits(['reloadPLO'])

const handleAdd = () => {
    modalAdd.value = !modalAdd.value
}

const handleEdit = (data: any) => {
    modalState.value = !modalState.value
    selectionPI.value = data // data for edit selection
}

const handleDelete = (data: any) => {
    selectionPI.value = data // data for edit selection
    modalDelete.value = !modalDelete.value
}

const deletePI = useDebounce(async () => {
    const { data } = await fetch.deletePI(_.get(selectionPI.value, 'id', 0))

    if (data.value) {
        modalDelete.value = false
        refreshData()
    }
})

const refreshData = async () => {
    console.log('ploIDSelection.value', ploIDSelection.value);
    emit('reloadPLO', ploIDSelection.value)
}
</script>

<template>
    <LayoutCard>
        <AtomsHeading class="text-center" type="sub" title="Chuẩn đầu ra trung gian (PI)" />

        <el-button type="primary" @click="handleAdd">
            Thêm
        </el-button>

        <el-table :data="_.get(props, 'items[0].pis', [])">
            <el-table-column prop="code" label="PI" width="80" />
            <el-table-column prop="description" label="Nội dung PI" width="400" />
            <el-table-column fixed="right">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
                        Sửa
                    </el-button>
                    <el-button link type="danger" size="small" @click="handleDelete(scope.row)">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>

    </LayoutCard>

    <!-- Add -->
    <LazyModalsPIAdd :ploID="ploIDSelection" :isOpenModal="modalAdd" @closeModal="modalAdd = false"
        @refreshData="refreshData" />

    <!-- Edit -->
    <LazyModalsPIEdit :ploId="Number(ploIDSelection)" :data="selectionPI" :isOpenModal="modalState"
        @closeModal="modalState = false" @refreshData="refreshData" />

    <!-- Delete -->
    <LazyModalsDeteleAction :isOpenModal="modalDelete" @closeModal="modalDelete = false" @confirm-delete="deletePI"
        @refreshData="refreshData" />
</template>