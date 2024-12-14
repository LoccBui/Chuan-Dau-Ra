<script lang="ts" setup>
import _ from 'lodash'

// Store
const nhapMapStore = useNhapMapStore()

// State
const idCTDT = ref('')
const subjectId = ref('')
const schoolyear = ref('')
const dataSetPis = ref([])
const dataSetMonHoc = ref([])
const cloSelection = ref('')
const monHocSelection = ref('')

// Computed
const listPis = computed(() => {
    return _.get(dataSetPis.value, 'pis', [])
})

const listMonHoc = computed(() => {
    return _.get(dataSetMonHoc.value, 'subjects', [])
})

// Functions
const changeNganh = (nganhData: any) => {
    console.log('nganhData', nganhData)
    subjectId.value = _.get(nganhData, 'id', '')
}

const changeNamKhaoSat = (year: string) => {
    schoolyear.value = year
    fetchMaTranDeThi()
    fetchListMonHoc()
}

const fetchListMonHoc = async () => {
    const { data } = await nhapMapStore.fetchListMonHoc(idCTDT.value, schoolyear.value)
    dataSetMonHoc.value = data.value
}

const fetchMaTranDeThi = async () => {
    const { data } = await nhapMapStore.fetchMaTranDeThi(idCTDT.value, schoolyear.value)
    dataSetPis.value = data.value
}

const changeMonHoc = () => {
    console.log('changeMonHoc', monHocSelection.value);
}

const changeCLO = () => {
    console.log('cloSelection', cloSelection.value);
}
</script>

<template>
    <LayoutContainer>

        <AtomsHeading class="text-center w-full" title="Ánh xạ chuẩn đầu ra môn học với chuẩn đầu ra chương trình" />

        <LayoutCard>
            <AtomsDropdownKhoa />
            <AtomsDropdownNganh @changeNganh="changeNganh" />
            <AtomsDropdownChuongTrinhDT @changeCTDT="(id) => idCTDT = id" />
            <AtomsDropdownNamKhaoSat @changeNamKhaoSat="changeNamKhaoSat" />
        </LayoutCard>


        <!-- PIs và môn học-->
        <LayoutCard>
            <div class="flex items-center gap-10">
                <span class="min-w-60">PI</span>

                <el-select>
                    <el-option v-for="pi in listPis" :key="pi.code" :label="pi.code" :value="pi.piTargets.id" />
                </el-select>
            </div>

            <div class="flex items-center gap-10">
                <span class="min-w-60">Môn học</span>

                <el-select v-model="monHocSelection" @change="changeMonHoc">
                    <el-option v-for="monhoc in listMonHoc" :key="monhoc.id" :label="monhoc.name" :value="monhoc" />
                </el-select>
            </div>
        </LayoutCard>
        
        
        <!-- Chọn CLO để xử lí ma trận và mapping -->
        <LayoutCard>
            <div class="flex items-center gap-10">
                <span class="min-w-60">CLO</span>

                <el-select v-model="cloSelection" @change="changeCLO">
                    <el-option v-for="clo in monHocSelection.clos" :key="clo.id" :label="clo.code" :value="clo" />
                </el-select>
            </div>
        </LayoutCard>
        
        <!-- Ma tran de thi --> 
        <MoleculesTableMaTranDeThi :subjectId="subjectId" :schoolyear="schoolyear" :idCTDT="idCTDT" />

        <!-- Mapping -->
        <!--api: 1 PIS -> pi theo ctdt (ko can nam) - pis -->
        <!--api: 2 import maps: lay theo ctdt (edu), nam  -->
        <MoleculesTableMappingMonHocVaCDR />

    </LayoutContainer>
</template>