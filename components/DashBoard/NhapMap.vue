<script lang="ts" setup>
import { facultyList } from '~/types/Faculty'

const facultySelection = ref('')
</script>

<template>
    <div class="flex flex-col gap-4">
        <AtomsHeading class="text-center w-full" title="Ánh xạ chuẩn đầu ra môn học với chuẩn đầu ra chương trình" />

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

        <!-- Ma Tran De Thi -->
        <LazyMoleculesTableMaTranDeThi />

        <!-- Mapping -->
        <LazyMoleculesTableMappingMonHocVaCDR />
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