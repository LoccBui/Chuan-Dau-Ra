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
        <div class="grid grid-cols-3 gap-4">
            <!-- Table 1 -->
            <div class="col-span-2">
                <AtomsHeading class="text-center" type="sub" title="Kết quả đánh giá PI" />

                <el-table :data="sampleData">
                    <el-table-column prop="date" label="PI" />
                    <el-table-column prop="name" label="Nội dung PI" />
                    <el-table-column prop="name" label="Năm khảo sát" />
                    <el-table-column prop="name" label="Đạt" />
                    <el-table-column prop="name" label="Tổng" />
                    <el-table-column prop="name" label="Tỷ lệ đạt" />
                    <el-table-column prop="name" label="Target" />
                    <el-table-column prop="name" label="Kết quả" />
                    <el-table-column fixed="right">
                        <template #default>
                            <el-button link type="primary" size="small" @click="handleClick">
                                Sửa
                            </el-button>
                            <el-button link type="danger" size="small">Xóa</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- Table 2 -->
            <div class="col-auto">
                <AtomsHeading class="text-center" type="sub" title="Kết quả PLO" />

                <div class="flex flex-col gap-1">
                    <span>Số lượng sinh viên đạt</span>
                    <el-input></el-input>
                </div>

                <div class="flex flex-col gap-1">
                    <span>Tổng sinh viên đạt</span>
                    <el-input></el-input>
                </div>

                <div class="flex flex-col gap-1">
                    <span>Tỷ lệ</span>
                    <el-input></el-input>
                </div>
            </div>
        </div>
    </el-card>
</template>
