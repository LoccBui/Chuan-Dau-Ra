<script lang="ts" setup>
import { facultyList } from '~/types/Faculty'

const facultySelection = ref('')
</script>

<template>
    <div class="flex flex-col gap-4">
        <AtomsHeading class="text-center w-full" title="Tương thích giữa môn học và chuẩn đầu ra (CLO)" />

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


        <LazyMoleculesTableMonHocVaChuanDauRa />

    </div>
</template>

<style lang="scss" scoped></style>