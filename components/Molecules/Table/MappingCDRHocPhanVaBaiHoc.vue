<script lang="ts" setup>
import { sampleData } from "~/types/SampleData";

const handleClick = () => {
    console.log('handleClick')
}
</script>

<template>
    <el-card shadow="never">
        <AtomsHeading class="text-center" type="sub" title="Mapping chuẩn đầu ra học phần và bài học" />

        <LayoutButton>
            <el-button type="primary">
                Thêm
            </el-button>
        </LayoutButton>


        <el-table :data="sampleData">
            <el-table-column prop="date" label="Bài học" />
            <el-table-column prop="name" label="LLOs" />
            <el-table-column prop="name" label="Đánh giá học phần" />
        </el-table>
    </el-card>
</template>
