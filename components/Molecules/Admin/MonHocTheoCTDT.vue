<script lang="ts" setup>
import _ from 'lodash'

// Store
const adminStore = useAdminStore()

// States
const pageSize = 10
const currentPage = ref(1)
const dataTable = ref([])
const isLoading = ref(false)

const paginatedData = computed(() => {
    let start = (currentPage.value - 1) * pageSize
    let end = start + pageSize
    if (!_.isEmpty(dataTable.value)) return dataTable.value.slice(start, end)
})

// Functions
const changeCTDT = async (educationProgramsId: number | string) => {
    const { data, pending } = await adminStore.fetchChuongTrinhDaoTaoById(Number(educationProgramsId))
    dataTable.value = data.value
    isLoading.value = pending.value
}
</script>

<template>
    <LayoutCard>
        <AtomsHeading class="text-center" type="sub" title="môn học theo chương trình đào tạo" />

        <AtomsDropdownKhoa />
        <AtomsDropdownNganh />
        <AtomsDropdownChuongTrinhDT @changeCTDT="changeCTDT" />

        <el-table v-loading="isLoading" :data="paginatedData" empty-text="Không có dữ liệu">
            <el-table-column prop="code" label="Mã môn" />
            <el-table-column prop="name" label="Tên môn" width="200" />
            <el-table-column prop="soTiet" label="Số tiết" />
            <el-table-column prop="soTinChi" label="Số tín chỉ" />
        </el-table>
    </LayoutCard>
</template>
