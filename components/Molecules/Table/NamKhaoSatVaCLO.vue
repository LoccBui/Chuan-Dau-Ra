<script lang="ts" setup>
import _ from 'lodash'
import type { SchoolYear } from '~/types/SchoolYears'

const props = defineProps<{
    data: [],
    idCLO: string | number
}>()

// Store
const fetchStore = useFetchStore()

// States
const modalAdd = ref<boolean>(false)
const schoolYear = ref('')

const currentPage = ref(1)
const listYears = ref(<SchoolYear[]>[])

const { data: yearsData } = await useFetch(useApiConnector() + '/years')
listYears.value = _.get(yearsData.value, 'data.schoolYears', []) // Get list years

const listClosTargets = computed(() => {
    const listClos = ref(_.get(props.data[0], 'cloTargets', []))


    const res = listYears.value.map((year) => {
        const matchingItem = listClos.value.find((cloItem) => cloItem.schoolYear.id === year.id);
        return matchingItem || null
    })

    return res
})


// Functions
const handleClick = () => {
    console.log('handleClick')
}

const setPage = (page: number) => {
    currentPage.value = page
}

const addCLo = (data: any) => {
    modalAdd.value = true // Open modal
    
    const schoolYearItem = listYears.value?.find((year, yearIndex) => yearIndex == data)
    
    schoolYear.value = schoolYearItem?.id ?? ''
}
</script>

<template>
    <LayoutCard>
        <AtomsHeading class="text-center" type="sub" title="Năm khảo sát" />
        
        
        <table v-if="!_.isEmpty(props.data)">
            <!-- heading -->
            <tr>
                <th v-for="year in listYears" :key="year.id"> {{ year.id }} </th>
            </tr>

            <!-- Rows -->
            <tr>
                <td v-for="(clo, cloIndex) in listClosTargets" :key="cloIndex">
                    <span v-if="clo"> {{ clo.requiredScore }}</span>
                    <el-button v-else size="small" circle type="primary" @click="addCLo(cloIndex)"> + </el-button>
                </td>
            </tr>
        </table>
        
        <el-tag v-else type="primary">Thêm mục tiêu PLO theo từng năm</el-tag>
        
    </LayoutCard>
    
    <ModalsMonHocVaCLONamKhaoSatAdd :schoolYear="schoolYear" :idCLO="idCLO" :isOpenModal="modalAdd" @closeModal="modalAdd = false" />
</template>

<style lang="scss" scoped>
table {
    @apply w-full;

    td {
        @apply text-center;
    }
}
</style>