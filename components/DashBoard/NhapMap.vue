<script lang="ts" setup>
const test1 = () => {
    alert('test1')
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <AtomsHeading class="text-center w-full" title="Ánh xạ chuẩn đầu ra môn học với chuẩn đầu ra chương trình" />

        <MoleculesDropdownKhoaNganhCNDT @changeKhoa="test1" @changeNganh="test2" />
        <AtomsDropdownNamKhaoSat @changeNamKhaoSat="test1" />

        <!-- Ma Tran De Thi -->
        <LazyMoleculesTableMaTranDeThi />

        <!-- Mapping -->
        <LazyMoleculesTableMappingMonHocVaCDR />
    </div>
</template>