<script lang="ts" setup></script>

<template>
    <div class="flex flex-col gap-4">
        <el-card shadow="never">
            <AtomsHeading class="text-center" type="sub" title="Xem báo cáo đánh giá chuẩn đầu ra" />
            <MoleculesDropdownKhoaNganhCNDT :hasBorder="false" hasNamKhaoSat @changeKhoa="test1" @changeNganh="test2" />

            <el-button size="large" class="w-full" type="primary">Xem</el-button>
        </el-card>


        <el-card shadow="never">
            <AtomsHeading class="text-center" type="sub" title="Xem báo cáo đánh giá chuẩn đầu ra" />
            <p class="w-full text-center">No data</p>
        </el-card>
    </div>
</template>