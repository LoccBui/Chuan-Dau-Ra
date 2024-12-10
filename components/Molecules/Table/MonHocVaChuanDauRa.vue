<script lang="ts" setup>
import _ from 'lodash'

export interface Props {
    idCTDT: number
}

const props = withDefaults(defineProps<Props>(), {})

const fetchStore = useFetchStore()
const monHocVaChuanDauRaStore = useMonHocVaChuanDauRaStore()

const modalState = ref<boolean>(false)
const modalDelete = ref<boolean>(false)
const modalAdd = ref<boolean>(false)
const modalEdit = ref<boolean>(false)
const pageSize = 10
const currentPage = ref(1)
const selectionTable = ref(null)


const emit = defineEmits(['changeMonHocTable'])
const params = computed(() => ({ eduProgramId: props.idCTDT })) // reativity data for useFetch, whenever the params (here the idCTDT) change, the API will be called again.
const { data: tableData, pending, refresh } = await useAuthFetch(`${fetchStore.apiConnector}/subjects`, { params })

const paginatedData = computed(() => {
    // Add idCTDT key for looping
    _.get(tableData.value, 'data.subjects', []).map((item) => {
        return item['idCTDT'] = `${props.idCTDT}`
    })

    // Paginate the results
    let start = (currentPage.value - 1) * pageSize
    let end = start + pageSize

    if (!_.isEmpty(tableData.value?.data)) return _.get(tableData.value, 'data.subjects', []).slice(start, end)
})

// Functions
const handleClick = () => {
    console.log('handleClick')
}

const handleAddFaculty = () => {
    console.log('handleAddFaculty')
}

const reloadData = () => {
    refresh()
}

const handleEdit = (data: any) => {
    selectionTable.value = data
    modalEdit.value = !modalEdit.value
}

const handleDelete = () => {
    modalDelete.value = !modalDelete.value
}

const setPage = (page: number) => {
    currentPage.value = page
}

const handleRowSelection = (clickedValue: never) => {
    emit('changeMonHocTable', clickedValue)
}

const openModal = () => {
    if (_.size(paginatedData.value) > 0) {
        modalAdd.value = true
    } else {
        useShowToast('Chưa có dữ liệu khoa', 'warning')
    }
}

const test = ref( [
    {name: 1},
    {name: 2},
    {name: 3},
    {name: 1},
    
])

console.log(paginatedData.value);
</script>

<template>
    <LayoutCard>

        <LayoutButton>
            <el-button @click="openModal" type="primary"> Thêm </el-button>
        </LayoutButton>
        

        <el-table :data="paginatedData" class="cursor-pointer" v-loading="pending" empty-text="Không có dữ liệu"
            @row-click="handleRowSelection">

            <el-table-column prop="code" label="Mã môn" />
            <el-table-column prop="name" label="Tên môn" width="200"/>
            <!-- <el-table-column prop="clos.name" label="Nhóm câu hỏi"/> -->
            <el-table-column label="Tổng CLO" />
            <el-table-column prop="clos.description" label="Nội dung CLO"/>
            <el-table-column prop="soTinChi" label="Điểm tối đa" />
            <el-table-column prop="soTinChi" label="Điểm cần đạt" />
              
            <el-table-column fixed="right">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
                        Sửa
                    </el-button>
                    <el-button link type="danger" size="small" @click="handleDelete">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" v-show="!_.isEmpty(paginatedData)" :total="_.size(paginatedData)"
            @current-change="setPage" />

    </LayoutCard>

    <LazyModalsMonHocVaCLOAdd :idCTDT="idCTDT" :isOpenModal="modalAdd" :data="selectionTable" :tableData="paginatedData"
        @closeModal="modalAdd = false" @refreshData="reloadData" />

    <LazyModalsMonHocVaCLOEdit :idCTDT="idCTDT" :isOpenModal="modalEdit" :data="selectionTable" @closeModal="modalEdit = false" />
    <LazyModalsDeteleAction :isOpenModal="modalDelete" @closeModal="modalDelete = false" />
</template>
