<script lang="ts" setup>
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
    },
]
</script>

<template>
    <div>
        <el-card shadow="never">
            <AtomsHeading class="text-center" type="sub" title="Chuẩn đầu ra trung gian (PI)" />

            <el-table :data="tableData">
                <el-table-column prop="date" label="PI" />
                <el-table-column prop="name" label="Nội dung PI" />
            </el-table>
        </el-card>
    </div>
</template>