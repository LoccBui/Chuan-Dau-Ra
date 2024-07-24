<script lang="ts" setup>
import { sampleData } from '~/types/SampleData'

const handleClick = () => {
    console.log('handleClick')
}
</script>

<template>
    <el-card shadow="never">
        <AtomsHeading class="text-center" type="sub" title="Danh sách các CTDT" />

        <el-button type="primary">
            Thêm
        </el-button>

        <el-table :data="sampleData">
            <el-table-column prop="date" label="Mã CTDT" />
            <el-table-column prop="name" label="Tên CTDT" />
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
