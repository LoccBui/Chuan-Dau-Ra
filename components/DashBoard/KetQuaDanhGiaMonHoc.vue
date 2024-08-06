<script lang="ts" setup></script>

<template>
    <div class="flex flex-col gap-4">
        <AtomsHeading class="text-center w-full" title="Đánh giá chuẩn đầu ra môn học" />

        <MoleculesDropdownKhoaNganhCNDT hasMonHoc hasNamKhaoSat @changeKhoa="test1" @changeNganh="test2" />

        <div class="grid grid-cols-2 gap-4">
            <LazyMoleculesTableDanhSachChuanDauRa />
            <LazyMoleculesTableChiTietChuanRaMonHoc />
        </div>

        <div class="grid grid-cols-2 gap-4">
            <LazyMoleculesTableKetQuaDanhGiaPI />
            <LazyMoleculesChartDanhGiaChuanDauRaMonHoc />
        </div>

        <el-card shadow="never">
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

        </el-card>
    </div>
</template>
