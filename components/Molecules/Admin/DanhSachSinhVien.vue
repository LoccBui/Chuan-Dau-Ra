<script lang="ts" setup>
import _ from 'lodash'

// Store
const adminStore = useAdminStore()

// State
const nienKhoa = ref('')
const modalDeleteSVState = ref(false)
const modalEditState = ref(false)
const pageSize = 10
const currentPage = ref(1)
const idCTDT = ref('')
const inputMaSV = ref('')
const inputHo = ref('')
const inputTen = ref('')
const lopSelections = ref('')
const idStudentDelete = ref('')
const dataSinhVienEdit = ref('')

const { data: listSinhVien, pending, refresh: refreshListSinhVien } = await adminStore.fetchListSinhVien()

// Computed
const paginatedData = computed(() => {
    let start = (currentPage.value - 1) * pageSize
    let end = start + pageSize
    if (!_.isEmpty(listSinhVien.value)) return listSinhVien.value.slice(start, end)
})

// Functions
const addNewSinhVien = async () => {
    if (checkInputAddSinhVien()) {
        const { data } = await adminStore.addSinhVien(lopSelections.value, inputHo.value, inputTen.value, inputMaSV.value)

        if (data.value) {
            refreshListSinhVien()
        }
    }
}

const checkInputAddSinhVien = () => {
    if (!lopSelections.value) {
        useShowToast('Cần chọn lớp', 'warning')
        return false
    }

    if (!inputHo.value) {
        useShowToast('Cần nhập họ', 'warning')
        return false
    }

    if (!inputTen.value) {
        useShowToast('Cần nhập tên', 'warning')
        return false
    }

    if (!inputMaSV.value) {
        useShowToast('Cần nhập mã sinh viên', 'warning')
        return false
    }

    return true
}

const deleteSinhVien = async () => {
    const { data } = await adminStore.deleteSinhVien(idStudentDelete.value)

    if (data.value) {
        modalDeleteSVState.value = false
        refreshListSinhVien()
    }
}

const handleEdit = (selection: any) => {
    modalEditState.value = !modalEditState.value
    dataSinhVienEdit.value = selection
}

const handleDelete = (selection: any) => {
    if (selection) {
        idStudentDelete.value = selection.id
        modalDeleteSVState.value = !modalDeleteSVState.value
    }
}

const setPage = (page: number) => {
    currentPage.value = page
}
</script>

<template>
    <LayoutContainer>

        <AtomsHeading class="text-center w-full" title="Nhập danh sách sinh viên" />

        <!-- Thêm Lớp -->
        <LayoutCard>
            <AtomsDropdownKhoa />
            <AtomsDropdownNganh @changeNganh="(item) => idCTDT = item?.id" />
            <AtomsDropdownNienKhoa v-model="nienKhoa" />
            <AtomsDropdownLop v-model="lopSelections" :programId="idCTDT" :schoolYear="nienKhoa" />

            <LayoutButton>
                <el-button type="primary"> Thêm </el-button>
            </LayoutButton>
        </LayoutCard>

        <!-- Thêm sinh viên -->
        <LayoutCard>
            <AtomsInputMaSinhVien v-model="inputMaSV" />
            <AtomsInputHo v-model="inputHo" />
            <AtomsInputTen v-model="inputTen" />

            <el-button type="primary" @click="addNewSinhVien">Thêm sinh viên</el-button>
        </LayoutCard>

        <!-- Table -->
        <LayoutCard>
            <p>Tổng số sinh viên: {{ paginatedData.length }}</p>

            <el-table v-loading="pending" :data="paginatedData" empty-text="Không có dữ liệu" highlight-current-row>
                <el-table-column fixed prop="id" label="Mã sinh viên" />
                <el-table-column prop="firstName" label="Họ" />
                <el-table-column prop="lastName" label="Tên" />
                <el-table-column prop="classRoom.id" label="Lớp" />
                <el-table-column fixed="right" label="">
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
    </LayoutContainer>

    <LazyModalsAdminSuaSinhVien :data="dataSinhVienEdit" :isOpenModal="modalEditState"
        @closeModal="modalEditState = false" @refreshData="refreshListSinhVien" />

    <LazyModalsDeteleAction :isOpenModal="modalDeleteSVState" title="Xóa sinh viên" @confirm-delete="deleteSinhVien"
        @closeModal="modalDeleteSVState = false" />
</template>