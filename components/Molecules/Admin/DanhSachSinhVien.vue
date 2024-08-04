<script lang="ts" setup>
import { sampleData } from '~/types/SampleData'


const modalAddSVState = ref(false)
const modalDeleteSVState = ref(false)

const handleClick = () => {
    console.log('handleClick')
}

const handleAdd = () => {
    modalAddSVState.value = !modalAddSVState.value
}

const handleDelete = () => {
    modalDeleteSVState.value = !modalDeleteSVState.value
}
</script>

<template>
    <div class="flex flex-col gap-4 w-full">
        <h1 class="w-full heading-primary text-center">Nhập danh sách sinh viên</h1>

        <div>
            <el-button type="primary" @click="handleAdd">Thêm sinh viên</el-button>
        </div>

        <el-card shadow="never">
            <el-table :data="sampleData">
                <el-table-column fixed prop="date" label="Mã sinh viên" />
                <el-table-column prop="name" label="Họ" />
                <el-table-column prop="state" label="Tên" />
                <el-table-column prop="city" label="Lớp" />
                <el-table-column fixed="right" label="">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick">
                            Sửa
                        </el-button>
                        <el-button link type="danger" size="small" @click="handleDelete">Xóa</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>

    <LazyModalsThemSinhVien :isOpenModal="modalAddSVState" @closeModal="modalAddSVState = false" />
    <LazyModalsDeteleAction :isOpenModal="modalDeleteSVState" title="Xóa sinh viên"
        @closeModal="modalDeleteSVState = false" />
</template>

<style lang="scss" scoped></style>