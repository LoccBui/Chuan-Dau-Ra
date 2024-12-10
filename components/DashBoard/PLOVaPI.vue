<script lang="ts" setup>
const selectionCTDTId = ref(0)
const selectionPLO = ref([])
const fetch = useFetchStore()
const listPloTargets = ref([])
const listPITargets = ref([])
const idPISelections = ref()
const listPis = ref([])

const changeCTDT = (selectionId: number) => {
    selectionCTDTId.value = selectionId

    console.log('CTDT id: ', selectionId);

    selectionPLO.value = [] // reset PI table
}

const changePLOSelection = async (selectionValue: any) => {
    selectionPLO.value = selectionValue
    listPloTargets.value = selectionPLO.value[0]
    
    console.log(selectionValue[0]?.id);
    
    
    const pis = await fetch.fetchPIs(Number(selectionValue[0]?.id), Number(selectionCTDTId.value))
    
    listPis.value = pis.data
    
    console.log('listPITargets.value', listPITargets.value);
}

const reloadPLO = async (ploID) => {
    const { data } = await fetch.getPIByPLOId(ploID) // reload PLO to update the pis
    selectionPLO.value = [data]
}

const changePISelection = (data) => {
    idPISelections.value = Number(data[0].id)
    listPITargets.value = data
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
        
        
        <!-- PLO target-->
        <MoleculesTablePLOVaPITargetPLO 
            :data="listPloTargets" 
        />
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <MoleculesTablePLOChuanDauRa :idCTDT="selectionCTDTId" @changePLOSelection="changePLOSelection" />
            <MoleculesTablePIChuanDauRa :idCTDT="selectionCTDTId" :items="listPis" @changePISelection="changePISelection" @reloadPLO="reloadPLO" />
        </div>
        
        <!-- PI target  -->
        <MoleculesTablePLOVaPITargetPI 
            :data="listPITargets" 
            :idPISelections="idPISelections"
        />
        
    </LayoutContainer>
</template>