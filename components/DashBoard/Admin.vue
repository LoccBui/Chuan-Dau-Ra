<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus'

const activeName = ref<string>('first')
</script>

<template>
    <div class="w-full h-screen">

        <el-tabs v-model="activeName">

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