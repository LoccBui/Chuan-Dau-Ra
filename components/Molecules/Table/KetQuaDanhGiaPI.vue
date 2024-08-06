<script lang="ts" setup>
import { sampleData } from '~/types/SampleData'

const handleClick = () => {
    console.log('handleClick')
}

const handleAddFaculty = () => {
    console.log('handleAddFaculty')
}
</script>

<template>
    <el-card shadow="never">
        <AtomsHeading class="text-center" type="sub" title="Kết quả đánh giá PI" />

        <el-table :data="sampleData">
            <el-table-column prop="date" label="PI" />
            <el-table-column prop="name" label="Nội dung PI" />
            <el-table-column prop="name" label="Năm khảo sát" />
            <el-table-column prop="name" label="Đạt" />
            <el-table-column prop="name" label="Tổng" />
            <el-table-column prop="name" label="Tỷ lệ đạt" />
            <el-table-column prop="name" label="Target" />
            <el-table-column prop="name" label="Kết quả" />
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
</template>
