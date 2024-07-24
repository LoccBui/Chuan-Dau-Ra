<script lang="ts" setup>
import { sampleData } from "~/types/SampleData";

const handleClick = () => {
    console.log('handleClick')
}
</script>

<template>
    <el-card shadow="never">
        <AtomsHeading class="text-center" type="sub" title="Chi tiết đánh giá chuẩn môn học" />

        <el-button type="primary">
            In báo cáo
        </el-button>

        <el-table :data="sampleData">
            <el-table-column prop="date" label="PLO" />
            <el-table-column prop="name" label="Nội dung PLO" />
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
