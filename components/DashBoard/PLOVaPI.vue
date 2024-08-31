<script lang="ts" setup>
const test1 = (value: string) => {
    console.log(value)
}
</script>

<template>
    <LayoutContainer>

        <AtomsHeading class="text-center w-full"
            title="Nhập dữ liệu chuẩn đầu ra chương trình (PLO) và chuẩn đầu ra trung gian (PI)" />

        <LayoutCard>
            <AtomsDropdownKhoa @changeKhoa="test1" />
            <AtomsDropdownNganh @changeNganh="test1" />
            <AtomsDropdownChuongTrinhDT @changeCTDT="test1" />
        </LayoutCard>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <MoleculesTablePLOChuanDauRa />
            <MoleculesTablePIChuanDauRa />
        </div>

    </LayoutContainer>
</template>