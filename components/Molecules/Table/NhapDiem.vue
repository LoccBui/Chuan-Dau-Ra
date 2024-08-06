<script lang="ts" setup>
import { sampleData } from "~/types/SampleData";

const handleClick = () => {
    console.log('handleClick')
}
</script>

<template>
    <el-card shadow="never">
        <el-table :data="sampleData">
            <el-table-column prop="date" label="Nhóm câu hỏi" />
            <el-table-column prop="name" label="CLO" />
            <el-table-column prop="name" label="Nội dung CLO" />
            <el-table-column prop="name" label="Target" />
            <el-table-column prop="name" label="Điểm tối đa" />
            <el-table-column prop="name" label="Điểm cần đạt" />
            <el-table-column prop="name" label="PLO" />
            <el-table-column prop="name" label="PI" />
        </el-table>
    </el-card>
</template>
