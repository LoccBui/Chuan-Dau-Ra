<script lang="ts" setup>
import { sampleData } from "~/types/SampleData";

const handleClick = () => {
    console.log('handleClick')
}
</script>

<template>
    <el-card shadow="never">
        <AtomsHeading class="text-center" type="sub"
            title="Nội dung môn học và kế hoạch giảng dạy (Course content, Lesson plan)" />

        <LayoutButton>
            <el-button type="primary">
                Cập nhật phương pháp
            </el-button>
        </LayoutButton>


        <el-table :data="sampleData">
            <el-table-column prop="date" label="Tuần" />
            <el-table-column prop="name" label="Bài học/Chương" />
            <el-table-column prop="name" label="Tên bài/Chương" />
            <el-table-column prop="name" label="LLOs" />
            <el-table-column prop="name" label="Nội dung LLO" />
            <el-table-column prop="name" label="Hoạt động dạy và học" />
            <el-table-column prop="name" label="Phương pháp giảng dạy" />
            <el-table-column prop="name" label="Phương pháp đánh giá" />
        </el-table>
    </el-card>
</template>
