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
        <AtomsHeading class="text-center" type="sub" title="Chấm điểm" />
        <el-button type="primary" @click="handleAddFaculty">
            Thêm
        </el-button>


        <el-table :data="sampleData">
            <el-table-column prop="date" label="Mã khoa" />
            <el-table-column prop="name" label="Tên khoa" />
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
