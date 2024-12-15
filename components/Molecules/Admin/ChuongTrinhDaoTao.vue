<script lang="ts" setup>
const dataKhoa = ref({})
const dataNganh = ref({})

const changeKhoa = (data) => {
    dataKhoa.value = data
    dataNganh.value = {} // reset
}
</script>

<template>
    <LayoutContainer>

        <AtomsHeading class="text-center w-full" title="Nhập danh sách chương trình đào tạo" />

        <MoleculesTableDanhSachKhoa @changeRowSelection="changeKhoa" />

        <div class="gap-4 grid grid-cols-1 lg:grid-cols-2">
            <LazyMoleculesTableDanhSachNganh :dataKhoa="dataKhoa" @changeNganhSelection="(data) => dataNganh = data" />
            <LazyMoleculesTableDanhSachCTDT :dataNganh="dataNganh" />
        </div>

    </LayoutContainer>
</template>