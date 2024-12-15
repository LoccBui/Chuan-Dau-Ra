<script lang="ts" setup>
import _ from 'lodash'
import type { SchoolYear } from '~/types/SchoolYears'

const props = defineProps<{
    data: [],
    idPISelections: string | number
}>()

const emit = defineEmits(['refreshData'])

// States
const modalAdd = ref<boolean>(false)
const schoolYear = ref('')
const currentPage = ref(1)
const listYears = ref(<SchoolYear[]>[])

const { data: yearsData } = await useFetch(useApiConnector() + '/years')
listYears.value = _.get(yearsData.value, 'data.schoolYears', []) // Get list years

const listClosTargets = computed(() => {
    const listClos = ref(_.get(props.data[0], 'piTargets', []))

    const res = listYears.value.map((year) => {
        const matchingItem = listClos.value.find((cloItem) => cloItem.schoolYear?.id === year.id);
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

const refreshData = () => {
    emit('refreshData')
}
</script>

<template>
    <LayoutCard>
        <AtomsHeading class="text-center" type="sub" title="Mục tiêu PI" />

        <table v-if="_.size(props.data) > 0">
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

        <p v-else> Cần chọn PI</p>

    </LayoutCard>

    <ModalsMonHocVaCLOPITargetAdd :schoolYear="schoolYear" :piId="idPISelections" :isOpenModal="modalAdd"
        @closeModal="modalAdd = false" @refreshData="refreshData" />
</template>

<style lang="scss" scoped>
table {
    @apply w-full;

    td {
        @apply text-center;
    }
}
</style>