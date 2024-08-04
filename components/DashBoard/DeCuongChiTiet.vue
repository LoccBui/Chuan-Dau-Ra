<script lang="ts" setup>
import { facultyList } from '~/types/Faculty';

const facultySelection = ref('')

const test1 = (value) => {
    alert(value)
}

const test2 = (value) => {
    alert(value)
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <AtomsHeading class="text-center w-full" title="Đề cương chi tiết" />

        <MoleculesDropdownKhoaNganhCNDT hasMonHoc @changeKhoa="test1" @changeNganh="test2" />

        <LayoutButton>
            <el-button type="primary"> Xem đề cương chi tiết</el-button>
        </LayoutButton>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <MoleculesTableDeCuongThongTinChung />
            <MoleculesTableMappingCDRHocPhanVaBaiHoc />
            <MoleculesTableChuanDauRaHocPhan />
            <MoleculesTableDanhGiaMonHoc />
        </div>

        <LazyMoleculesTableNoiDungVaKeHoachGiangDay />
    </div>
</template>