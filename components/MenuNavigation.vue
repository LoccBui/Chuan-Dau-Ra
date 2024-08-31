<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu,
    Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const auth = useAuthStore()
const route = useRoute()

import { menu } from '~/types/Menu'

const isCorrectRoute = (path: string) => route.params.category === path

const moveTo = (path: string) => {
    navigateTo(`/dashboard/${path}`)
}

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<template>
    <div>
        <el-menu class="h-screen" :collapse="isCollapse" @open="handleOpen" @close="handleClose">

            <el-menu-item class="!sticky top-0 z-20 shadow !bg-white" @click="isCollapse = !isCollapse">
                <div>
                    <Icon v-if="isCollapse" name="majesticons:menu-expand-right-line" />
                    <Icon v-if="!isCollapse" name="majesticons:menu-expand-left-line" />
                </div>

                <h1 :class="{ 'hidden': isCollapse }">Chuẩn đầu ra</h1>
            </el-menu-item>

            <el-divider class="!m-0" />


            <el-menu-item :class="{ 'is-active': route.params.category === 'plo-va-pi' }" @click="moveTo('plo-va-pi')">
                <el-icon><icon-menu /></el-icon>
                <template #title>PLO và PI</template>
            </el-menu-item>


            <el-menu-item :class="{ 'is-active': isCorrectRoute('mon-hoc-va-clo') }" @click="moveTo('mon-hoc-va-clo')">
                <el-icon>
                    <document />
                </el-icon>
                <template #title>Môn học và CLO</template>
            </el-menu-item>

            <el-menu-item :class="{ 'is-active': isCorrectRoute('nhap-map') }" @click="moveTo('nhap-map')">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>Nhập map</template>
            </el-menu-item>

            <el-menu-item :class="{ 'is-active': isCorrectRoute('de-cuong-chi-tiet') }"
                @click="moveTo('de-cuong-chi-tiet')">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>Đề cương chi tiết</template>
            </el-menu-item>

            <el-menu-item :class="{ 'is-active': isCorrectRoute('cham-diem') }" @click="moveTo('cham-diem')">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>Chấm điểm</template>
            </el-menu-item>

            <el-menu-item :class="{ 'is-active': isCorrectRoute('ket-qua-danh-gia-mon-hoc') }"
                @click="moveTo('ket-qua-danh-gia-mon-hoc')">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>Kết quả đánh giá môn học</template>
            </el-menu-item>

            <el-menu-item :class="{ 'is-active': isCorrectRoute('ket-qua-danh-gia-chuong-trinh-dao-tao') }"
                @click="moveTo('ket-qua-danh-gia-chuong-trinh-dao-tao')">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>Kết quả đánh giá chương trình đào tạo</template>
            </el-menu-item>

            <el-menu-item @click="moveTo('tai-khoan')">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>Thông tin tài khoản</template>
            </el-menu-item>

            <el-menu-item @click="moveTo('admin')">
                <Icon name="clarity:administrator-solid" />
                <template #title>Admin</template>
            </el-menu-item>

            <el-menu :collapse="isCollapse" @open="handleOpen" @close="handleClose">
                <el-sub-menu class="!min-w-fit" index="1">
                    <template #title>
                        <Icon name="tabler:report-search" />
                        <span>In báo cáo</span>
                    </template>
                    <el-menu-item :class="{ 'is-active': route.params.category === 'bao-cao-tong-hop-ctdt' }"
                        @click="moveTo('bao-cao-tong-hop-ctdt')">
                        Tổng hợp theo CTDT
                    </el-menu-item>
                    <el-menu-item index="1-1">Chi tiết các môn không đạt</el-menu-item>
                    <el-menu-item index="1-1">Đánh giá sinh viên</el-menu-item>
                </el-sub-menu>
            </el-menu>

            <el-menu default-active="2" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
                <el-sub-menu class="!min-w-fit" index="1">
                    <template #title>
                        <Icon name="clarity:administrator-line" />
                        <span>Admin</span>
                    </template>
                    <el-menu-item index="1-1">Phân quyền</el-menu-item>
                    <el-menu-item index="1-1">Admin</el-menu-item>
                    <el-menu-item index="1-1">Quản lý user</el-menu-item>
                    <el-menu-item index="1-1">Đổi mật khẩu</el-menu-item>
                </el-sub-menu>
            </el-menu>

            <!-- Log out -->
            <el-menu-item class="!sticky !bottom-0 w-full !border-t-[.5px] hover:!bg-red-500/5" @click="auth.logOut()">
                <Icon name="ion:log-out" />
                <template #title>Đăng xuất</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    @apply w-full;
}

.el-menu-item {
    @apply leading-5 bg-white whitespace-normal #{!important};
}

.is-active {
    @apply bg-primary/5 #{!important};
}

.icon,
svg {
    @apply min-w-5 min-h-5 max-w-5 max-h-5 mr-[5px];
}
</style>