<script lang="ts" setup>
import _ from 'lodash'

const props = defineProps<{
    subjectId: number | string
    schoolyear: string
    idCTDT: number | string
}>()

const fetchStore = useFetchStore()
const nhapMapStore = useNhapMapStore()

// States
const modalState = ref<boolean>(false)
const modalDelete = ref<boolean>(false)
const pageSize = 10
const currentPage = ref(1)
const tableData = ref([])

// Computed 
const paginatedData = computed(() => {
    let start = (currentPage.value - 1) * pageSize
    let end = start + pageSize
    if (!_.isEmpty(tableData.value)) return tableData.value.slice(start, end)
})

// Functions
const { data, pending } = await fetchStore.fetchMonHocAndCLO()

watch(
    () => props.schoolyear,
    async () => {
    const { data } = await nhapMapStore.fetchMappingTable(props.schoolyear, props.subjectId, String(props.idCTDT))
    tableData.value = [data.value]
})


const fetchMappingTable = async () => {
}


const handleClick = () => {
    console.log('handleClick')
}

const handleAddFaculty = () => {
    console.log('handleAddFaculty')
}

const setPage = (page: number) => {
    currentPage.value = page
}
</script>

<template>
    <LayoutCard>
        <AtomsHeading class="text-center !capitalize" type="sub" title="Ma trận đề thi" />

        <el-table v-loading="pending" :data="paginatedData" empty-text="Không có dữ liệu">
            <el-table-column prop="code" label="Mã môn" />
            <el-table-column prop="name" label="Tên môn" />
            <el-table-column prop="name" label="PI" />
            <el-table-column prop="name" label="Mã PLO" />
            <el-table-column prop="name" label="CLO" />
            <el-table-column prop="name" label="Nội dung CLO" />
            <el-table-column prop="name" label="Nhóm câu hỏi" />
            <el-table-column prop="name" label="Target" />
            <el-table-column prop="name" label="Điểm tối đa" />
            <el-table-column prop="name" label="Điểm cần đạt" />
        </el-table>

        <el-pagination layout="prev, pager, next" v-show="!_.isEmpty(data)" :total="_.size(data)"
            @current-change="setPage" />

        <p class="mt-4">Tổng điểm: </p>
        
    </LayoutCard>
</template>
