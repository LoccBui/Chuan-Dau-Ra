<script lang="ts" setup>
const test1 = (value: string) => {
    alert(value)
}

const lookDetailDeCuong = () => {
    console.log('Detail de cuong');
}
</script>

<template>
    <LayoutContainer>

        <AtomsHeading class="text-center w-full" title="Đề cương chi tiết" />

        <LayoutCard>
            <AtomsDropdownKhoa @changeKhoa="test1" />
            <AtomsDropdownNganh @changeNganh="test1" />
            <AtomsDropdownChuongTrinhDT @changeCTDT="test1" />
            <AtomsDropdownMonHoc @changeMonHoc="test1" />
        </LayoutCard>


        <LayoutButton>
            <el-button type="primary" @click="lookDetailDeCuong"> Xem đề cương chi tiết </el-button>
        </LayoutButton>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <MoleculesTableDeCuongThongTinChung />
            <MoleculesTableMappingCDRHocPhanVaBaiHoc />
            <MoleculesTableChuanDauRaHocPhan />
            <MoleculesTableDanhGiaMonHoc />
        </div>

        <LazyMoleculesTableNoiDungVaKeHoachGiangDay />

    </LayoutContainer>
</template>