<script lang="ts" setup>
import { sampleData } from "~/types/SampleData";

const handleClick = () => {
    console.log('handleClick')
}
</script>

<template>
    <el-card shadow="never">
        <el-table :data="sampleData">
            <el-table-column prop="date" label="PLO" />
            <el-table-column prop="name" label="Nội dung PLO" />
            <el-table-column prop="name" label="Năm khảo sát" />
            <el-table-column prop="name" label="Số lượng đạt" />
            <el-table-column prop="name" label="Tổng khảo sát" />
            <el-table-column prop="name" label="Tỷ lệ" />
            <el-table-column prop="name" label="Target" />
            <el-table-column prop="name" label="Kết quả" />
        </el-table>
    </el-card>

    <!-- Chart -->
    <el-card shadow="never">
        <LazyMoleculesChartDanhGiaChuanDauRaCTDaoTao />
    </el-card>
</template>
