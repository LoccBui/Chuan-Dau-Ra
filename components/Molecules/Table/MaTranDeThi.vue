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
        <AtomsHeading class="text-center !capitalize" type="sub" title="Ma trận đề thi" />

        <el-table :data="sampleData">
            <el-table-column prop="date" label="Mã môn" />
            <el-table-column prop="name" label="Tên môn" />
            <el-table-column prop="name" label="PI" />
            <el-table-column prop="name" label="Mã PLO" />
            <el-table-column prop="name" label="CLO" />
            <el-table-column prop="name" label="Nội dung CLO" />
            <el-table-column prop="name" label="Nhóm câu hỏi" />
            <el-table-column prop="name" label="Target" />
            <el-table-column prop="name" label="Điểm tối đa" />
            <el-table-column prop="name" label="Điểm cần đạt" />
        </el-table>

        <p class="mt-4">Tổng điểm: </p>
    </el-card>
</template>
