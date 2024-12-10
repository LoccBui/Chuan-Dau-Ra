<script lang="ts" setup>
import _ from 'lodash'

const idCTDT = ref(-1)
const inputMaMon = ref('')
const inputCLO = ref('')
const listCLOs = ref([])
const inputDiemCanDat = ref('')
const inputNamKhaoSat = ref('')
const cloID = ref('')

const setInputValue = (dataSelections: any) => {
    listCLOs.value = _.get(dataSelections, 'clos', [])
    cloID.value = _.get(dataSelections, 'clos[0].id', [])
    inputMaMon.value = _.get(dataSelections, 'id')
    inputCLO.value = _.get(dataSelections, 'inputCLO', 'Chua xu li data')
    inputDiemCanDat.value = _.get(dataSelections, 'diemcandata', 'Chua xu li data')
    inputNamKhaoSat.value = _.get(dataSelections, 'diemcandata', 'Chua xu li data')
}
</script>

<template>
    <LayoutContainer>
        <AtomsHeading class="text-center w-full" title="Tương thích giữa môn học và chuẩn đầu ra (CLO)" />

        <LayoutCard>
            <AtomsDropdownKhoa />
            <AtomsDropdownNganh />
            <AtomsDropdownChuongTrinhDT @changeCTDT="(ctdtID) => idCTDT = ctdtID" />
        </LayoutCard>
        
        <MoleculesTableNamKhaoSatVaCLO 
            :data="listCLOs" 
            :idCLO="cloID" 
        />

        <MoleculesTableMonHocVaChuanDauRa :idCTDT="idCTDT" @changeMonHocTable="setInputValue" />
    </LayoutContainer>
</template>