<script lang="ts" setup>
import _ from 'lodash'
import type { SchoolYear } from '~/types/SchoolYears'

const props = defineProps<{
    data: []
}>()

// Store
const fetchStore = useFetchStore()

// States
const modalAdd = ref<boolean>(false)
const schoolYear = ref('')

const idPLOTargets = computed(() => {
    return _.get(props.data, 'id', '')
})

const currentPage = ref(1)
const listYears = ref(<SchoolYear[]>[])

const { data: yearsData } = await useFetch(useApiConnector() + '/years')
listYears.value = _.get(yearsData.value, 'data.schoolYears', []) // Get list years

const listClosTargets = computed(() => {
    const listClos = ref(_.get(props.data, 'ploTargets', []))

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
    
    
    console.log(schoolYearItem);
    schoolYear.value = schoolYearItem?.id ?? ''
}
</script>

<template>
    <LayoutCard>        
        <AtomsHeading class="text-center" type="sub" title="Mục tiêu PLO" />
        
        <!-- <table v-if="!_.isEmpty(props.data)"> -->
        <table>
            <!-- heading -->
            <tr>
                <th v-for="year in listYears" :key="year.id"> {{ year.id }} </th>
            </tr>

            <!-- Rows -->
            <tr>
                <td v-for="(clo, cloIndex) in listClosTargets" :key="cloIndex">
                    <span v-if="clo"> {{ clo.targetScore }}</span>
                    <el-button v-else size="small" circle type="primary" @click="addCLo(cloIndex)"> + </el-button>
                </td>
            </tr>
        </table>
        
    </LayoutCard>
    
    <ModalsMonHocVaCLOPLOTargerAdd :schoolYear="schoolYear" :ploId="idPLOTargets" :isOpenModal="modalAdd" @closeModal="modalAdd = false" />
</template>

<style lang="scss" scoped>
table {
    @apply w-full;

    td {
        @apply text-center;
    }
}
</style>