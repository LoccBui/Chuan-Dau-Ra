<script lang="ts" setup>
import _ from 'lodash'

const props = defineProps<{
    dataNganh: Object
}>()


// Stores
const fetchStore = useFetchStore()
const adminStore = useAdminStore()

// States
const modalAdd = ref<boolean>(false)
const modalEdit = ref<boolean>(false)
const modalDelete = ref<boolean>(false)

const programId = ref('')
const pageSize = 10
const currentPage = ref(1)
const tableData = ref([])
const editData = ref({})
const deleteId = ref('')

watch(
    () => props.dataNganh,
    () => {
        tableData.value = _.get(props.dataNganh, 'educationPrograms', [])
        programId.value = _.get(props.dataNganh, 'id', '')
    }
)

const paginatedData = computed(() => {
    let start = (currentPage.value - 1) * pageSize
    let end = start + pageSize
    if (!_.isEmpty(tableData.value)) return tableData.value.slice(start, end)
})

// Functions
const handleEdit = (data: object) => {
    modalEdit.value = true
    editData.value = data
}

const handleDelete = (data: object) => {
    modalDelete.value = true
    deleteId.value = data.id
}

const setPage = (page: number) => {
    currentPage.value = page
}

const confirmDelete = () => {
}

const refresh = () => { }
</script>

<template>
    <LayoutCard>

        <AtomsHeading class="text-center" type="sub" title="Danh sách các CTDT" />

        <el-button type="primary" @click="modalAdd = true">
            Thêm
        </el-button>

        <el-table :data="paginatedData" empty-text="Không có dữ liệu">
            <el-table-column prop="code" label="Mã CTDT" />
            <el-table-column prop="name" label="Tên CTDT" />
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

    <ModalsAdminAddCTDT :programId="programId" :isOpenModal="modalAdd" title="Thêm chương trình đào tạo"
        @refreshData="refresh" @closeModal="modalAdd = false" />

    <ModalsAdminEditCTDT :data="editData" :isOpenModal="modalEdit" title="Sửa chương trình đào tạo"
        @refreshData="refresh" @closeModal="modalEdit = false" />

    <ModalsDeteleAction :isOpenModal="modalDelete" title="Xóa khoa" @confirm-delete="confirmDelete"
        @closeModal="modalDelete = false" />
</template>
