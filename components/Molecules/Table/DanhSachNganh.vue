<script lang="ts" setup>
import _ from 'lodash'

const props = defineProps<{
  dataKhoa: Object
}>()

const emit = defineEmits(['changeNganhSelection'])

// Store
const adminStore = useAdminStore()

// States
const modalAdd = ref<boolean>(false)
const modalDelete = ref<boolean>(false)
const modalEdit = ref<boolean>(false)

const isLoading = ref<boolean>(false)
const pageSize = 10
const currentPage = ref(1)
const tableData = ref([])
const facultyId = ref('')
const editData = ref({})
const deleteId = ref('')

// Watchers
const paginatedData = computed(() => {
  let start = (currentPage.value - 1) * pageSize
  let end = start + pageSize
  if (!_.isEmpty(tableData.value)) return tableData.value.slice(start, end)
})

watch(
  () => props.dataKhoa,
  () => {
    tableData.value = _.get(props.dataKhoa, 'programs', [])
    facultyId.value = _.get(props.dataKhoa, 'id', '')
  }
)

// Functions
const setPage = (page: number) => {
  currentPage.value = page
}

const handleRowSelection = (dataRow: object) => {
  emit('changeNganhSelection', dataRow)
}

const handleEdit = (rowSelection: object) => {
  editData.value = rowSelection
  modalEdit.value = true
}

const handleDelete = (rowSelection: object) => {
  modalDelete.value = true
  deleteId.value = _.get(rowSelection, 'id', '')
}

const confirmDelete = async () => {
  const { data } = await adminStore.deleteNganh(Number(deleteId.value))
}

const refresh = () => {

}
</script>

<template>
  <LayoutCard>

    <AtomsHeading class="text-center" type="sub" title="Danh sách các ngành" />

    <el-button type="primary" @click="modalAdd = true">
      Thêm
    </el-button>

    <el-table highlight-current-row v-loading="isLoading" :data="paginatedData" empty-text="Không có dữ liệu"
      @row-click="handleRowSelection">
      <el-table-column prop="code" label="Mã ngành" width="100" />
      <el-table-column prop="name" label="Tên ngành" />
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

  <ModalsAdminAddNganh :facultyId="facultyId" :isOpenModal="modalAdd" title="Thêm ngành" @refreshData="refresh"
    @closeModal="modalAdd = false" />

  <ModalsAdminEditNganh :data="editData" :isOpenModal="modalEdit" title="Sửa ngành" @refreshData="refresh"
    @closeModal="modalEdit = false" />

  <LazyModalsDeteleAction :isOpenModal="modalDelete" title="Xóa ngành" @confirm-delete="confirmDelete"
    @closeModal="modalDelete = false" />
</template>
