<script lang="ts" setup>
import { sampleData } from '~/types/SampleData'

const modalState = ref<boolean>(false)
const modalDelete = ref<boolean>(false)

const handleClick = () => {
    console.log('handleClick')
}

const handleAddFaculty = () => {
    console.log('handleAddFaculty')
}
</script>

<template>
    <el-card shadow="never">

        <div class="flex justify-end">
            <el-button type="primary" @click="handleAddFaculty">
                Thêm
            </el-button>
        </div>

        <el-table :data="sampleData">
            <el-table-column prop="date" label="Mã môn" />
            <el-table-column prop="name" label="Tên môn" />
            <el-table-column prop="name" label="Số tiết" />
            <el-table-column prop="name" label="Số tín chỉ" />
            <el-table-column prop="name" label="Mã CTDT" />
            <el-table-column fixed="right">
                <template #default>
                    <el-button link type="primary" size="small" @click="handleClick">
                        Sửa
                    </el-button>
                    <el-button link type="danger" size="small">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>


    <!-- <LazyModalsDetailPIChuanDauRa :data="selectionPLO" :isOpenModal="modalState" @closeModal="modalState = false" />
    <LazyModalsDeteleAction :isOpenModal="modalDelete" @closeModal="modalDelete = false" /> -->
</template>
