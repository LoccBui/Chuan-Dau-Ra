<script lang="ts" setup>
const selectionYear = ref('2023-2024')

const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
]

const handleAddYear = () => {
    console.log('handleAddYear')
}
</script>

<template>
    <div class="flex flex-col gap-4 w-full">
        <h1 class="w-full heading-primary text-center">Nhập danh sách chương trình đào tạo</h1>

        <el-card shadow="never">
            <div class="flex items-center gap-4">
                <el-text size="large">Năm khảo sát</el-text>
                <el-select v-model="selectionYear" :placeholder="selectionYear" class="max-w-sm">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-button type="primary" @click="handleAddYear">Thêm</el-button>
            </div>
        </el-card>

        <LazyMoleculesTableDanhSachKhoa />

        <div class="gap-4 grid grid-cols-1 lg:grid-cols-2">
            <LazyMoleculesTableDanhSachNganh />
            <LazyMoleculesTableDanhSachCTDT />
        </div>

    </div>
</template>

<style lang="scss" scoped></style>