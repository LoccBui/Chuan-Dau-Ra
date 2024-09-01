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

const setPage = (page: number) => {
  currentPage.value = page
}
</script>

<template>
  <LayoutCard>

    <AtomsHeading class="text-center" type="sub" title="Danh sách các ngành" />

    <el-button type="primary">
      Thêm
    </el-button>

    <el-table v-loading="pending" :data="paginatedData" empty-text="Không có dữ liệu">
      <el-table-column prop="date" label="Mã ngành" />
      <el-table-column prop="name" label="Tên ngành" />
      <el-table-column fixed="right">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">
            Sửa
          </el-button>
          <el-button link type="danger" size="small">Xóa</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination layout="prev, pager, next" v-show="!_.isEmpty(data)" :total="_.size(data)"
      @current-change="setPage" />

  </LayoutCard>
</template>
