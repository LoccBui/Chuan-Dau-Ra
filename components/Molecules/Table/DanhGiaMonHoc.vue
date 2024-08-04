<script lang="ts" setup>
import { sampleData } from "~/types/SampleData";

const handleClick = () => {
    console.log('handleClick')
}
</script>

<template>
    <el-card shadow="never">
        <AtomsHeading class="text-center" type="sub" title="Đánh giá môn học" />

        <el-table :data="sampleData">
            <el-table-column prop="date" label="Thành phần đánh giá" />
            <el-table-column prop="name" label="Hình thức đánh giá" />
            <el-table-column prop="name" label="CLOs" />
            <el-table-column prop="name" label="Tỉ lệ (%)" />
        </el-table>
    </el-card>
</template>
