<script lang="ts" setup>

const test1 = (value) => {
    alert(value)
}

const test2 = (value) => {
    alert(value)
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <span class="text-red-500">123</span>
        <AtomsHeading class="text-center w-full"
            title="Nhập dữ liệu chuẩn đầu ra chương trình (PLO) và chuẩn đầu ra trung gian (PI)" />

        <MoleculesDropdownKhoaNganhCNDT @changeKhoa="test1" @changeNganh="test2" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <LazyMoleculesTablePLOChuanDauRa />
            <LazyMoleculesTablePIChuanDauRa />
        </div>
    </div>
</template>