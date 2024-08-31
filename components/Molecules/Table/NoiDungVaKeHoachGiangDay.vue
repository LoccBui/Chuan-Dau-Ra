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

const handleEdit = () => {
    modalState.value = !modalState.value
}

const handleDelete = () => {
    modalDelete.value = !modalDelete.value
}

const setPage = (page: number) => {
    currentPage.value = page
}
</script>

<template>
    <LayoutCard>

        <AtomsHeading class="text-center" type="sub"
            title="Nội dung môn học và kế hoạch giảng dạy (Course content, Lesson plan)" />

        <LayoutButton>
            <el-button type="primary">
                Cập nhật phương pháp
            </el-button>
        </LayoutButton>

        <el-table v-loading="pending" :data="paginatedData" empty-text="Không có dữ liệu">
            <el-table-column prop="name" label="Bài học/Chương" />
            <el-table-column prop="name" label="Tên bài/Chương" />
            <el-table-column prop="name" label="LLOs" />
            <el-table-column prop="name" label="Nội dung LLO" />
            <el-table-column prop="name" label="Hoạt động dạy và học" />
            <el-table-column prop="name" label="Phương pháp giảng dạy" />
            <el-table-column prop="name" label="Phương pháp đánh giá" />
        </el-table>

        <el-pagination layout="prev, pager, next" v-show="!_.isEmpty(data)" :total="_.size(data)"
            @current-change="setPage" />

    </LayoutCard>
</template>
