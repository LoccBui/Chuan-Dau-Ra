<script lang="ts" setup>
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

const modalState: boolean = ref(false)

const handleClick = () => {
    console.log(tableData)
    modalState.value = !modalState.value
}

const handleEdit = () => {
    console.log(tableData)
}
</script>

<template>
    <div>
        <el-card shadow="never">
            <AtomsHeading class="text-center" type="sub" title="Chuẩn đầu ra chương trình (PLO)" />
            <el-table :data="tableData">
                <el-table-column prop="date" label="PLO" />
                <el-table-column prop="name" label="Nội dung PLO" />
                <el-table-column fixed="right" label="Operations">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick">
                            Sửa
                        </el-button>
                        <el-button link type="danger" size="small" @click="handleEdit">Xóa</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>

    <LazyModalsDetailPIChuanDauRa :isOpenModal="modalState" @closeModal="modalState = false" />
</template>