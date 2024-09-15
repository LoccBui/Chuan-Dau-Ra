<script lang="ts" setup>
const fetchStore = useFetchStore()

const changeKHoa = (id: number) => {
    fetchStore.khoaSelection = id
}
</script>

<template>
    <LayoutContainer>
        <AtomsHeading class="text-center w-full"
            title="Nhập dữ liệu chuẩn đầu ra chương trình (PLO) và chuẩn đầu ra trung gian (PI)" />

        <LayoutCard>
            <AtomsDropdownKhoa @changeKhoa="changeKHoa" />
            <AtomsDropdownNganh @changeNganh="changeKHoa" />
            <AtomsDropdownChuongTrinhDT @changeCTDT="changeKHoa" />
        </LayoutCard>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <MoleculesTablePLOChuanDauRa />
            <MoleculesTablePIChuanDauRa />
        </div>

    </LayoutContainer>
</template>