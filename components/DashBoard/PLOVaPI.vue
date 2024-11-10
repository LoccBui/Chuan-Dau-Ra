<script lang="ts" setup>
const selectionCTDTId = ref(0)
const selectionPLO = ref([])
const fetch = useFetchStore()

const changeCTDT = (selectionId: number) => {
    selectionCTDTId.value = selectionId

    console.log('CTDT id: ', selectionId);

    selectionPLO.value = [] // reset PI table
}

const changePLOSelection = (selectionValue) => {
    selectionPLO.value = selectionValue
}

const reloadPLO = async (ploID) => {
    const { data } = await fetch.getPIByPLOId(ploID) // reload PLO to update the pis
    selectionPLO.value = [data]
}
</script>

<template>
    <LayoutContainer>
        <AtomsHeading class="text-center w-full"
            title="Nhập dữ liệu chuẩn đầu ra chương trình (PLO) và chuẩn đầu ra trung gian (PI)" />

        <LayoutCard>
            <AtomsDropdownKhoa />
            <AtomsDropdownNganh />
            <AtomsDropdownChuongTrinhDT @changeCTDT="changeCTDT" />
        </LayoutCard>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <MoleculesTablePLOChuanDauRa :idCTDT="selectionCTDTId" @changePLOSelection="changePLOSelection" />
            <MoleculesTablePIChuanDauRa :idCTDT="selectionCTDTId" :items="selectionPLO" @reloadPLO="reloadPLO" />
        </div>

    </LayoutContainer>
</template>