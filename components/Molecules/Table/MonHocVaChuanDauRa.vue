<script lang="ts" setup>
import _ from 'lodash'

export interface Props {
    idCTDT: number
}

const props = withDefaults(defineProps<Props>(), {})

const fetchStore = useFetchStore()
const modalState = ref<boolean>(false)
const modalDelete = ref<boolean>(false)
const pageSize = 10
const currentPage = ref(1)

const emit = defineEmits(['changeMonHocTable'])
const params = computed(() => ({ eduProgramId: props.idCTDT })) // reativity data for useFetch, whenever the params (here the idCTDT) change, the API will be called again.

const { data: tableData, pending } = await useAuthFetch(`${fetchStore.apiConnector}/subjects`, { params })

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

const handleEdit = () => {
    modalState.value = !modalState.value
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
</script>

<template>
    <LayoutCard>

        <LayoutButton>
            <el-button type="primary"> Thêm </el-button>
        </LayoutButton>

        <h1>Tracking {{ params }}</h1>

        <el-table v-loading="pending" empty-text="Không có dữ liệu" :data="paginatedData" class="cursor-pointer"
            @row-click="handleRowSelection">

            <el-table-column prop="id" label="Mã môn" />
            <el-table-column prop="name" label="Tên môn" width="200" />
            <el-table-column prop="soTiet" label="Số tiết" />
            <el-table-column prop="soTinChi" label="Số tín chỉ" />
            <el-table-column prop="idCTDT" label="Mã CTDT" />
            <el-table-column fixed="right">
                <template #default>
                    <el-button link type="primary" size="small" @click="handleEdit">
                        Sửa
                    </el-button>
                    <el-button link type="danger" size="small" @click="handleDelete">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination layout="prev, pager, next" v-show="!_.isEmpty(paginatedData)" :total="_.size(paginatedData)"
            @current-change="setPage" />

    </LayoutCard>

    <!-- <LazyModalsDetailPIChuanDauRa :data="selectionPLO" :isOpenModal="modalState" @closeModal="modalState = false" /> -->
    <LazyModalsDeteleAction :isOpenModal="modalDelete" @closeModal="modalDelete = false" />
</template>
