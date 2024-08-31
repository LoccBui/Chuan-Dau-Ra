<script lang="ts" setup>
import _ from 'lodash'

const fetchStore = useFetchStore()
const modalState = ref<boolean>(false)
const modalDelete = ref<boolean>(false)
const pageSize = 10
const currentPage = ref(1)

const { data, pending } = await fetchStore.fetchMappingMHAndCDR()

const paginatedData = computed(() => {
    let start = (currentPage.value - 1) * pageSize
    let end = start + pageSize
    if (!_.isEmpty(data.value)) return data.value.slice(start, end)
})

const handleClick = () => {
    console.log('handleClick')
}

const handleAddFaculty = () => {
    console.log('handleAddFaculty')
}

const setPage = (page: number) => {
    currentPage.value = page
}

const printReport = () => {
    console.log('printReport');
}
</script>

<template>
    <LayoutCard>

        <AtomsHeading class="text-center !capitalize" type="sub" title="Mapping giữa môn học và chuẩn đầu ra" />

        <LayoutButton>
            <el-button type="primary" @click="printReport"> In báo cáo </el-button>
        </LayoutButton>

        <el-table v-loading="pending" :data="paginatedData" empty-text="Không có dữ liệu">
            <el-table-column prop="date" label="Mã môn" />
            <el-table-column prop="name" label="Tên môn" />
            <!-- 1 -->
            <el-table-column prop="name" label="PI1.2" />
            <el-table-column prop="name" label="PI1.3" />
            <el-table-column prop="name" label="PI1.4" />
            <!-- 2 -->
            <el-table-column prop="name" label="PI2.1" />
            <el-table-column prop="name" label="PI2.2" />
            <el-table-column prop="name" label="PI2.3" />
            <el-table-column prop="name" label="PI2.4" />
            <!-- 3 -->
            <el-table-column prop="name" label="PI3.1" />
            <el-table-column prop="name" label="PI3.2" />
            <el-table-column prop="name" label="PI3.4" />
            <!-- 4 -->
            <el-table-column prop="name" label="PI4.1" />
            <el-table-column prop="name" label="PI4.2" />
            <el-table-column prop="name" label="PI4.3" />
            <!-- 5 -->
            <el-table-column prop="name" label="PI5.1" />
            <el-table-column prop="name" label="PI5.3" />
            <el-table-column prop="name" label="PI5.4" />
        </el-table>

        <el-pagination layout="prev, pager, next" v-show="!_.isEmpty(data)" :total="_.size(data)"
            @current-change="setPage" />

        <p class="mt-4">Tổng điểm: </p>

    </LayoutCard>
</template>
