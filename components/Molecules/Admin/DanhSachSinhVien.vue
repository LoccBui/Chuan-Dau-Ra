<script lang="ts" setup>
import _ from 'lodash'

const fetchStore = useFetchStore()
const modalAddSVState = ref(false)
const modalDeleteSVState = ref(false)
const pageSize = 10
const currentPage = ref(1)

const { data, pending } = await fetchStore.fetchMonHocAndCLO()

const paginatedData = computed(() => {
    let start = (currentPage.value - 1) * pageSize
    let end = start + pageSize
    if (!_.isEmpty(data.value)) return data.value.slice(start, end)
})

// Functions
const handleClick = () => {
    console.log('handleClick')
}

const handleAdd = () => {
    modalAddSVState.value = !modalAddSVState.value
}

const handleDelete = () => {
    modalDeleteSVState.value = !modalDeleteSVState.value
}

const setPage = (page: number) => {
    currentPage.value = page
}
</script>

<template>
    <LayoutContainer>

        <AtomsHeading class="text-center w-full" title="Nhập danh sách sinh viên" />

        <div>
            <el-button type="primary" @click="handleAdd">Thêm sinh viên</el-button>
        </div>

        <LayoutCard>

            <el-table v-loading="pending" :data="paginatedData" empty-text="Không có dữ liệu">
                <el-table-column fixed prop="date" label="Mã sinh viên" />
                <el-table-column prop="name" label="Họ" />
                <el-table-column prop="state" label="Tên" />
                <el-table-column prop="city" label="Lớp" />
                <el-table-column fixed="right" label="">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick">
                            Sửa
                        </el-button>
                        <el-button link type="danger" size="small" @click="handleDelete">Xóa</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination layout="prev, pager, next" v-show="!_.isEmpty(data)" :total="_.size(data)"
                @current-change="setPage" />

        </LayoutCard>

    </LayoutContainer>

    <LazyModalsThemSinhVien :isOpenModal="modalAddSVState" @closeModal="modalAddSVState = false" />
    <LazyModalsDeteleAction :isOpenModal="modalDeleteSVState" title="Xóa sinh viên"
        @closeModal="modalDeleteSVState = false" />
</template>