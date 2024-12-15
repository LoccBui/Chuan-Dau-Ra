<script lang="ts" setup>
import _ from 'lodash'


// Store
const fetchStore = useFetchStore()
const adminStore = useAdminStore()

// States
const modalAdd = ref<boolean>(false)
const modalDelete = ref<boolean>(false)
const modalEdit = ref<boolean>(false)
const pageSize = 20
const currentPage = ref(1)
const deleteId = ref('')
const editData = ref({})
const isLoading = ref<boolean>(false)

const tableData = computed(() => {
    return fetchStore.faculties
})

if (_.size(fetchStore.faculties) <= 0) {
    await fetchStore.fetchKhoa()
}

const paginatedData = computed(() => {
    let start = (currentPage.value - 1) * pageSize
    let end = start + pageSize
    if (!_.isEmpty(tableData.value)) return tableData.value.slice(start, end)
})

// Functions
const fetchKhoa = async () => {
    isLoading.value = true // Show loading first
    const { pending } = await fetchStore.fetchKhoa()
    isLoading.value = pending.value
}

const handleDelete = (selection: object) => {
    modalDelete.value = true
    deleteId.value = _.get(selection, 'id', '')
}

const confirmDelete = async () => {
    const { data } = await adminStore.deleteKhoa(deleteId.value)

    if (data.value) {
        modalDelete.value = false
        fetchKhoa()
    }
}

const handleEdit = (selection: object) => {
    modalEdit.value = true
    editData.value = selection
}

const setPage = (page: number) => {
    currentPage.value = page
}

const handleRowSelection = (dataRow: any) => {
    console.log(dataRow);
}
</script>

<template>
    <LayoutCard>

        <AtomsHeading class="text-center" type="sub" title="Danh sách các khoa" />

        <el-button type="primary" @click="modalAdd = true">
            Thêm
        </el-button>

        <el-table v-loading="isLoading" :data="paginatedData" empty-text="Không có dữ liệu" highlight-current-row
            @row-click="handleRowSelection">
            <el-table-column prop="code" label="Mã khoa" width="100" />
            <el-table-column prop="name" label="Tên khoa" />
            <el-table-column fixed="right">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
                        Sửa
                    </el-button>
                    <el-button link type="danger" size="small" @click="handleDelete(scope.row)">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination layout="prev, pager, next" v-show="!_.isEmpty(paginatedData)" :total="_.size(paginatedData)"
            @current-change="setPage" />

    </LayoutCard>

    <ModalsAdminAddKhoa :isOpenModal="modalAdd" title="Thêm khoa" @refreshData="fetchKhoa"
        @closeModal="modalAdd = false" />

    <ModalsAdminEditKhoa :data="editData" :isOpenModal="modalEdit" title="Sửa khoa" @refreshData="fetchKhoa"
        @closeModal="modalEdit = false" />

    <LazyModalsDeteleAction :isOpenModal="modalDelete" title="Xóa khoa" @confirm-delete="confirmDelete"
        @closeModal="modalDelete = false" />
</template>
