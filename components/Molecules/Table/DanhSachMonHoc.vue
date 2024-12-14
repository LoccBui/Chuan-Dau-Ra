<script lang="ts" setup>
import _ from 'lodash'

// Store
const fetchStore = useFetchStore()
const adminStore = useAdminStore()

// States
const modalAdd = ref<boolean>(false)
const modalEdit = ref<boolean>(false)
const modalDelete = ref<boolean>(false)
const editData = ref({})
const deleteId = ref(null)
const emit = defineEmits(['transferMonHoc'])

const pageSize = 10
const currentPage = ref(1)

const { data, pending, refresh: refreshListMonHoc } = await adminStore.fetchListMonHoc()

const paginatedData = computed(() => {
    let start = (currentPage.value - 1) * pageSize
    let end = start + pageSize
    if (!_.isEmpty(data.value)) return data.value.slice(start, end)
})

// Functions
const handleEdit = (selection: object) => {
    modalEdit.value = true
    editData.value = selection
}

const handleDelete = (selection: object) => {
    modalDelete.value = true
    deleteId.value = _.get(selection, 'id', null)
}

const confirmDelete = async () => {
    const { data } = await adminStore.deleteMonHoc(deleteId.value)

    if (data.value) {
        modalDelete.value = false
        refreshListMonHoc()
    }
}

const setPage = (page: number) => {
    currentPage.value = page
}

const handleRowSelection = (dataRow: any) => {
    emit('transferMonHoc', dataRow)
}
</script>

<template>
    <LayoutCard>
        <AtomsHeading class="text-center" type="sub" title="Danh sách môn học" />

        <el-button type="primary" @click="modalAdd = true">
            Thêm
        </el-button>

        <el-table highlight-current-row @row-click="handleRowSelection" v-loading="pending" :data="paginatedData"
            empty-text="Không có dữ liệu">
            <el-table-column prop="code" label="Mã môn" />
            <el-table-column prop="name" label="Tên môn" width="200" />
            <el-table-column prop="soTiet" label="Số tiết" />
            <el-table-column prop="soTinChi" label="Số tín chỉ" />
            <el-table-column fixed="right" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
                        Sửa
                    </el-button>
                    <el-button link type="danger" size="small" @click="handleDelete(scope.row)">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination layout="prev, pager, next" v-show="!_.isEmpty(data)" :total="_.size(data)"
            @current-change="setPage" />

    </LayoutCard>

    <ModalsAdminThemMonHoc :isOpenModal="modalAdd" title="Thêm môn học" @refreshData="refreshListMonHoc"
        @closeModal="modalAdd = false" />

    <ModalsAdminEditMonHoc :data="editData" :isOpenModal="modalEdit" title="Sửa môn học"
        @refreshData="refreshListMonHoc" @closeModal="modalEdit = false" />

    <LazyModalsDeteleAction :isOpenModal="modalDelete" title="Xóa môn học" @confirm-delete="confirmDelete"
        @closeModal="modalDelete = false" />
</template>
