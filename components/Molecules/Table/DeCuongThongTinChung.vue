<script lang="ts" setup>
import { sampleData } from "~/types/SampleData";

const modalState = ref<boolean>(false)
const modalDelete = ref<boolean>(false)

const handleClick = () => {
    console.log('handleClick')
}

const handleAddFaculty = () => {
    console.log('handleAddFaculty')
}

const handleEdit = () => {
    modalState.value = !modalState.value
}

const handleDelete = () => {
    modalDelete.value = !modalDelete.value
}
</script>

<template>
    <el-card shadow="never">
        <AtomsHeading class="text-center" type="sub" title="Thông tin chung" />

        <LayoutButton>
            <el-button type="primary">Thêm</el-button>
        </LayoutButton>


        <el-table :data="sampleData">
            <el-table-column prop="date" label="PLO" />
            <el-table-column prop="name" label="Nội dung PLO" />
            <el-table-column fixed="right">
                <template #default>
                    <el-button link type="primary" size="small" @click="handleClick">
                        Sửa
                    </el-button>
                    <el-button link type="danger" size="small" @click="handleDelete">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>


    <!-- <LazyModalsDetailPIChuanDauRa :data="selectionPLO" :isOpenModal="modalState" @closeModal="modalState = false" /> -->
    <LazyModalsDeteleAction :isOpenModal="modalDelete" @closeModal="modalDelete = false" />
</template>
