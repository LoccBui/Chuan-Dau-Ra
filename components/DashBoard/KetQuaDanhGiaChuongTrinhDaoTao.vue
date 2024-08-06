<script lang="ts" setup></script>

<template>
    <div class="flex flex-col gap-4">
        <AtomsHeading class="text-center w-full" title="Đánh giá chuẩn đầu ra chương trình đào tạo" />

        <el-card shadow="never">
            <MoleculesDropdownKhoaNganhCNDT :hasBorder="false" hasNamKhaoSat @changeKhoa="test1" @changeNganh="test2" />
            <LayoutButton class="mr-4">
                <el-button type="primary">Xem</el-button>
                <el-button type="primary">In đồ thị</el-button>
            </LayoutButton>
        </el-card>

        <LazyMoleculesTableDanhGiaChuanDauRaCTDaoTao />
    </div>
</template>