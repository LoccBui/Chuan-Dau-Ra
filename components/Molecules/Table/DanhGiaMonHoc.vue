<script lang="ts" setup>
import _ from 'lodash'

const fetchStore = useFetchStore()
const modalState = ref<boolean>(false)
const modalDelete = ref<boolean>(false)
const pageSize = 10
const currentPage = ref(1)

const { data, pending } = await fetchStore.fetchDanhGiaMonHoc()

const paginatedData = computed(() => {
    let start = (currentPage.value - 1) * pageSize
    let end = start + pageSize
    if (!_.isEmpty(data.value)) 
        return data.value.slice(start, end)
})

// Functions
const handleClick = () => {
    console.log('handleClick')
}

const setPage = (page: number) => {
    currentPage.value = page
}
</script>

<template>
    <LayoutCard>
        <AtomsHeading class="text-center" type="sub" title="Đánh giá môn học" />

        <el-table v-loading="pending" :data="paginatedData" empty-text="Không có dữ liệu">
            <el-table-column prop="date" label="Thành phần đánh giá" />
            <el-table-column prop="name" label="Hình thức đánh giá" />
            <el-table-column prop="name" label="CLOs" />
            <el-table-column prop="name" label="Tỉ lệ (%)" />
        </el-table>

        <el-pagination layout="prev, pager, next" v-show="!_.isEmpty(data)" :total="_.size(data)"
            @current-change="setPage" />

    </LayoutCard>
</template>
