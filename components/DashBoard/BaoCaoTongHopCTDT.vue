<script lang="ts" setup>
import { facultyList } from '~/types/Faculty'

const facultySelection = ref('')
</script>

<template>
    <div class="grid grid-cols-2 gap-4">
        <el-card shadow="never">
            <AtomsHeading class="text-center" type="sub" title="Xem báo cáo đánh giá chuẩn đầu ra" />
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

                <el-button type="primary"> Xem </el-button>
            </div>
        </el-card>

        <el-card shadow="never">
            <AtomsHeading class="text-center" type="sub" title="Xem báo cáo đánh giá chuẩn đầu ra" />
        </el-card>
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
}
</style>