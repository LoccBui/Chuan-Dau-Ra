<script lang="ts" setup></script>

<template>
    <LayoutContainer>

        <AtomsHeading class="text-center w-full" title="Đánh giá chuẩn đầu ra chương trình đào tạo" />

        <LayoutCard>

            <AtomsDropdownKhoa @changeKhoa="test1" />
            <AtomsDropdownNganh @changeNganh="test1" />
            <AtomsDropdownChuongTrinhDT @changeCTDT="test1" />
            <AtomsDropdownNamKhaoSat @changeNamKhaoSat="test1" />

            <LayoutButton>
                <el-button type="primary">Xem</el-button>
                <el-button type="primary">In đồ thị</el-button>
            </LayoutButton>

        </LayoutCard>

        <LazyMoleculesTableDanhGiaChuanDauRaCTDaoTao />

        <!-- Chart -->
        <LayoutCard>
            <LazyMoleculesChartDanhGiaChuanDauRaCTDaoTao />
        </LayoutCard>

    </LayoutContainer>
</template>