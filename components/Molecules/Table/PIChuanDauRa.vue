<script lang="ts" setup>
const gui = useGuiStore()
</script>

<template>
    <div>
        <el-card shadow="never">
            <AtomsHeading class="text-center" type="sub" title="Chuẩn đầu ra trung gian (PI)" />

            <el-table :data="gui.currentDataSelection">
                <el-table-column prop="date" label="PI" />
                <el-table-column prop="name" label="Nội dung PI" />
                <el-table-column prop="name" label="PLO" />
            </el-table>
        </el-card>
    </div>
</template>