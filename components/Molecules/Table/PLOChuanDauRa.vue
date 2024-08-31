<script lang="ts" setup>
import { sampleData } from '~/types/SampleData'

const gui = useGuiStore()

const modalState = ref<boolean>(false)
const modalDelete = ref<boolean>(false)

const selectionPLO = ref(null)

const handleEdit = (data: any) => {
    modalState.value = !modalState.value
    selectionPLO.value = data // data for edit selection
}

const handleDelete = () => {
    modalDelete.value = !modalDelete.value
}

const handleRowSelection = (clickedValue: never) => {
    gui.currentDataSelection = [clickedValue]
}
</script>

<template>
    <LayoutCard>
        <AtomsHeading class="text-center" type="sub" title="Chuẩn đầu ra chương trình (PLO)" />

        <el-table @row-click="handleRowSelection" :data="sampleData" class="cursor-pointer">
            <el-table-column prop="date" label="PLO" />
            <el-table-column prop="name" label="Nội dung PLO" />
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

    <LazyModalsDetailPIChuanDauRa :data="selectionPLO" :isOpenModal="modalState" @closeModal="modalState = false" />
    <LazyModalsDeteleAction :isOpenModal="modalDelete" @closeModal="modalDelete = false" />
</template>