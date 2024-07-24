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

        <AtomsHeading class="text-center !capitalize" type="sub" title="Mapping giữa môn học và chuẩn đầu ra" />

        <el-button type="primary"> In báo cáo </el-button>

        <el-table :data="sampleData">
            <el-table-column prop="date" label="Mã môn" />
            <el-table-column prop="name" label="Tên môn" />
            <!-- 1 -->
            <el-table-column prop="name" label="PI1.2" />
            <el-table-column prop="name" label="PI1.3" />
            <el-table-column prop="name" label="PI1.4" />
            <!-- 2 -->
            <el-table-column prop="name" label="PI2.1" />
            <el-table-column prop="name" label="PI2.2" />
            <el-table-column prop="name" label="PI2.3" />
            <el-table-column prop="name" label="PI2.4" />
            <!-- 3 -->
            <el-table-column prop="name" label="PI3.1" />
            <el-table-column prop="name" label="PI3.2" />
            <el-table-column prop="name" label="PI3.4" />
            <!-- 4 -->
            <el-table-column prop="name" label="PI4.1" />
            <el-table-column prop="name" label="PI4.2" />
            <el-table-column prop="name" label="PI4.3" />
            <!-- 5 -->
            <el-table-column prop="name" label="PI5.1" />
            <el-table-column prop="name" label="PI5.3" />
            <el-table-column prop="name" label="PI5.4" />

        </el-table>

        <p class="mt-4">Tổng điểm: </p>
    </el-card>
</template>
