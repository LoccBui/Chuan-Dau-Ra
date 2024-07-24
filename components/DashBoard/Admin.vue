<script lang="ts" setup>
const activeName = ref('first')
import type { TabsPaneContext } from 'element-plus'

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>

<template>
    <div class="w-full h-full">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="Sinh viên" name="first">
                <LazyMoleculesAdminDanhSachSinhVien />
            </el-tab-pane>
            <el-tab-pane label="Danh sách môn học" name="second">
                <LazyMoleculesAdminDanhSachMonHoc />
            </el-tab-pane>
            <el-tab-pane label="Chương trình đào tạo" name="third">
                <LazyMoleculesAdminChuongTrinhDaoTao />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style lang="scss" scoped></style>