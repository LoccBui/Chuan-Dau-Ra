<script lang="ts" setup>
import _ from 'lodash'

const fetchStore = useFetchStore()
const modalState = ref<boolean>(false)
const modalDelete = ref<boolean>(false)
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

const handleAddFaculty = () => {
    console.log('handleAddFaculty')
}

const setPage = (page: number) => {
    currentPage.value = page
}
</script>

<template>
    <LayoutCard>
    
        <AtomsHeading class="text-center !capitalize" type="sub" title="Ma trận đề thi" />

        <el-table v-loading="pending" :data="paginatedData" empty-text="Không có dữ liệu">
            <el-table-column prop="date" label="Mã môn" />
            <el-table-column prop="name" label="Tên môn" />
            <el-table-column prop="name" label="PI" />
            <el-table-column prop="name" label="Mã PLO" />
            <el-table-column prop="name" label="CLO" />
            <el-table-column prop="name" label="Nội dung CLO" />
            <el-table-column prop="name" label="Nhóm câu hỏi" />
            <el-table-column prop="name" label="Target" />
            <el-table-column prop="name" label="Điểm tối đa" />
            <el-table-column prop="name" label="Điểm cần đạt" />
        </el-table>

        <el-pagination layout="prev, pager, next" v-show="!_.isEmpty(data)" :total="_.size(data)"
            @current-change="setPage" />

        <p class="mt-4">Tổng điểm: </p>
        
    </LayoutCard>
</template>
