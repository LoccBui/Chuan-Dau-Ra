<script lang="ts" setup>
const test1 = () => {
    console.log('test');
}
</script>

<template>
    <LayoutContainer>

        <AtomsHeading class="text-center w-full" title="Ánh xạ chuẩn đầu ra môn học với chuẩn đầu ra chương trình" />

        <LayoutCard>
            <AtomsDropdownKhoa @changeKhoa="test1" />
            <AtomsDropdownNganh @changeNganh="test1" />
            <AtomsDropdownChuongTrinhDT @changeCTDT="test1" />
            <AtomsDropdownNamKhaoSat @changeNamKhaoSat="test1" />
        </LayoutCard>

        <!-- Ma Tran De Thi -->
        <MoleculesTableMaTranDeThi />

        <!-- Mapping -->
        <MoleculesTableMappingMonHocVaCDR />

    </LayoutContainer>
</template>