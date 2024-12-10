<script lang="ts" setup>
import _ from 'lodash'

const nhapMapStore = useNhapMapStore()

// State
const idCTDT = ref('')
const subjectId = ref('')
const schoolyear = ref('')

const changeNganh = (nganhData: any) => {
    console.log('nganhData', nganhData)
    subjectId.value = _.get(nganhData, 'id', '')
}
</script>

<template>
    <LayoutContainer>

        <AtomsHeading class="text-center w-full" title="Ánh xạ chuẩn đầu ra môn học với chuẩn đầu ra chương trình" />

        <LayoutCard>
            <AtomsDropdownKhoa />
            <AtomsDropdownNganh @changeNganh="changeNganh" />
            <AtomsDropdownChuongTrinhDT @changeCTDT="(id) => idCTDT = id" />
            <AtomsDropdownNamKhaoSat @changeNamKhaoSat="(year) => schoolyear = year" />
        </LayoutCard>
        
        <!-- Ma tran de thi -->
        <MoleculesTableMaTranDeThi 
            :subjectId="subjectId" 
            :schoolyear="schoolyear" 
            :idCTDT="idCTDT" 
        />

        <!-- Mapping -->
        <MoleculesTableMappingMonHocVaCDR />

    </LayoutContainer>
</template>