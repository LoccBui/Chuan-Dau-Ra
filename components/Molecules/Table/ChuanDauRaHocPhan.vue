<script lang="ts" setup>
import { sampleData } from "~/types/SampleData";

const handleClick = () => {
    console.log('handleClick')
}
</script>

<template>
    <el-card shadow="never">
        <AtomsHeading class="text-center" type="sub" title="Chuẩn đầu ra học phần" />

        <LayoutButton>
            <el-button type="primary">
                Điều chỉnh
            </el-button>
        </LayoutButton>


        <el-table :data="sampleData">
            <el-table-column prop="date" label="Bài học" />
            <el-table-column prop="name" label="LLOs" />
            <el-table-column prop="name" label="Đánh giá học phần" />
        </el-table>
    </el-card>
</template>
