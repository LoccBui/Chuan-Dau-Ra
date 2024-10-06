<script lang="ts" setup>
import _ from 'lodash'

export interface Props {
    idCTDT: number
}

const props = withDefaults(defineProps<Props>(), {
    idCTDT: 0
})

const emit = defineEmits(['changePLOSelection'])

const fetch = useFetchStore()
const tableData = ref([])
const modalState = ref<boolean>(false)
const modalDelete = ref<boolean>(false)
const modalAdd = ref<boolean>(false)
const selectionPLO = ref(null)

watch(
    () => props.idCTDT,
    async () => {
        const { data } = await fetch.fetchPLOById(props.idCTDT)
        tableData.value = data
    })

const handleEdit = (data: any) => {
    modalState.value = !modalState.value
    selectionPLO.value = data // data for edit selection

    console.log(selectionPLO.value);
}

const handleDelete = () => {
    modalDelete.value = !modalDelete.value
}

const handleAdd = () => {
    modalAdd.value = !modalAdd.value
}

const handleRowSelection = (clickedValue: never) => {
    console.log('object row selection', clickedValue);
    emit('changePLOSelection', [clickedValue])
    selectionPLO.value = clickedValue
}

const deletePLO = useDebounce(async () => {
    const { data } = await fetch.deletePLO(selectionPLO.value.id)

    if (data.value) {
        modalDelete.value = false
        refreshData()
    }
})

const refreshData = async () => {
    const { data } = await fetch.fetchPLOById(props.idCTDT)
    tableData.value = data
}
</script>

<template>
    <LayoutCard>
        <AtomsHeading class="text-center" type="sub" title="Chuẩn đầu ra chương trình (PLO)" />

        <el-button type="primary" @click="handleAdd">
            Thêm
        </el-button>

        <el-table @row-click="handleRowSelection" :data="_.get(tableData, 'plos', [])" class="cursor-pointer"
            width="500" highlight-current-row>
            <el-table-column prop="code" label="PLO" width="80" />
            <el-table-column prop="description" label="Nội dung PLO" width="400" />
            <el-table-column fixed="right">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
                        Sửa
                    </el-button>
                    <el-button link type="danger" size="small" @click="handleDelete">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>
    </LayoutCard>


    <!-- Add -->
    <LazyModalsAddNewPLO :data="selectionPLO" :isOpenModal="modalAdd" @closeModal="modalAdd = false"
        @refreshData="refreshData" />

    <!-- Edit -->
    <LazyModalsEditPLO :data="selectionPLO" :isOpenModal="modalState" @closeModal="modalState = false"
        @refreshData="refreshData" />

    <!-- Delete -->
    <LazyModalsDeteleAction :isOpenModal="modalDelete" @closeModal="modalDelete = false" @confirm-delete="deletePLO"
        @refreshData="refreshData" />
</template>