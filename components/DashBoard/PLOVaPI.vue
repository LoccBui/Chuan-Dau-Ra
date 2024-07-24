<script lang="ts" setup>
import { facultyList } from '~/types/Faculty'

const facultySelection = ref('')
</script>

<template>
    <div class="flex flex-col gap-4">
        <AtomsHeading class="text-center w-full"
            title="Nhập dữ liệu chuẩn đầu ra chương trình (PLO) và chuẩn đầu ra trung gian (PI)" />

        <el-card shadow="never">
            <div class="section__selection">

                <div class="section__selection__item">
                    <span class="section__selection__label">Khoa</span>
                    <el-select v-model="facultySelection" placeholder="Chọn khoa">
                        <el-option v-for="(item, index) in facultyList" :key="index" :label="item.name"
                            :value="item.name" />
                    </el-select>
                </div>


                <div class="section__selection__item">
                    <span class="section__selection__label">Ngành</span>
                    <el-select v-model="facultySelection" placeholder="Chọn khoa">
                        <el-option v-for="(item, index) in facultyList" :key="index" :label="item.name"
                            :value="item.name" />
                    </el-select>
                </div>


                <div class="section__selection__item">
                    <span class="section__selection__label">Chương trình đào tạo</span>
                    <el-select v-model="facultySelection" placeholder="Chọn khoa">
                        <el-option v-for="(item, index) in facultyList" :key="index" :label="item.name"
                            :value="item.name" />
                    </el-select>
                </div>
            </div>
        </el-card>

        <div class="section__content">

            <LazyMoleculesTablePLOChuanDauRa />
            <LazyMoleculesTablePIChuanDauRa />

            <!-- Brain storming: 
                - Chọn dòng trong table PLO sẽ cho hiển thị thông tin của PLO đó và chi tiết PI
                - Bấm chỉnh sửa sẽ cho phép chỉnh sửa thông tin của PLO đó và chi tiết PI (nằm trong Modal)
            -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.section {
    $self: &;

    &__selection {
        @apply flex flex-col gap-4;

        &__item {
            @apply flex items-center gap-10;
        }

        &__label {
            @apply min-w-40;
        }
    }

    &__content {
        @apply grid grid-cols-1 md:grid-cols-2 gap-2;
    }
}
</style>