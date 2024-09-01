<script lang="ts" setup></script>

<template>
    <LayoutContainer>

        <AtomsHeading class="text-center w-full" title="Đánh giá chuẩn đầu ra môn học" />

        <LayoutCard>
            <AtomsDropdownKhoa @changeKhoa="test1" />
            <AtomsDropdownNganh @changeNganh="test1" />
            <AtomsDropdownChuongTrinhDT @changeCTDT="test1" />
            <AtomsDropdownMonHoc @changeMonHoc="test1" />
            <AtomsDropdownNamKhaoSat @changeNamKhaoSat="test1" />
        </LayoutCard>

        <div class="grid grid-cols-2 gap-4">
            <MoleculesTableDanhSachChuanDauRa />
            <MoleculesTableChiTietChuanRaMonHoc />
        </div>

        <div class="grid grid-cols-2 gap-4">
            <LazyMoleculesTableKetQuaDanhGiaPI />
            <LazyMoleculesChartDanhGiaChuanDauRaMonHoc />
        </div>

        <LayoutCard>

            <AtomsHeading class="text-center" type="sub" title="Kết quả PLO" />

            <div class="flex flex-col gap-1">
                <span>Số lượng sinh viên đạt</span>
                <el-input value="Readonly" readonly></el-input>
            </div>

            <div class="flex flex-col gap-1">
                <span>Tổng sinh viên đạt</span>
                <el-input value="Readonly" readonly></el-input>
            </div>

            <div class="flex flex-col gap-1">
                <span>Tỷ lệ</span>
                <el-input value="Readonly" readonly></el-input>
            </div>

        </LayoutCard>

    </LayoutContainer>
</template>
