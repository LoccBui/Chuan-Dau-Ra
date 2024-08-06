<script lang="ts" setup>
import { facultyList } from '~/types/Faculty'

interface Props {
    hasMonHoc?: boolean
    hasNamKhaoSat?: boolean
    hasBorder?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    hasMonHoc: false,
    hasNamKhaoSat: false,
    hasBorder: true,
})


const khoaSelection = ref('')
const nganhSelection = ref('')
const ctdtSelection = ref('')

const emit = defineEmits(['changeKhoa', 'changeNganh', 'changeCTDT'])

const changeKhoa = () => {
    emit('changeKhoa', khoaSelection.value)
}

const changeNganh = () => {
    emit('changeNganh', nganhSelection.value)
}

const changeCTDT = () => {
    emit('changeCTDT', ctdtSelection.value)
}

const dynamicCssClasses = computed(() => ({
    '!border-0': !props.hasBorder,
    '': props.hasBorder,
}))
</script>

<template>
    <el-card :class="dynamicCssClasses" shadow="never">
        <div class="flex flex-col gap-4">
            <div class="flex items-center gap-10">
                <span class="min-w-60">Khoa</span>
                <el-select v-model="khoaSelection" placeholder="Chọn khoa" @change="changeKhoa">
                    <el-option v-for="(item, index) in facultyList" :key="index" :label="item.name"
                        :value="item.name" />
                </el-select>
            </div>

            <div class="flex items-center gap-10">
                <span class="min-w-60">Ngành</span>
                <el-select v-model="nganhSelection" placeholder="Chọn ngành" @change="changeNganh">
                    <el-option v-for="(item, index) in facultyList" :key="index" :label="item.name"
                        :value="item.name" />
                </el-select>
            </div>

            <div class="flex items-center gap-10">
                <span class="min-w-60">Chương trình đào tạo</span>
                <el-select v-model="ctdtSelection" placeholder="Chọn chương trình đào tạo" @change="changeCTDT">
                    <el-option v-for="(item, index) in facultyList" :key="index" :label="item.name"
                        :value="item.name" />
                </el-select>
            </div>

            <LazyAtomsDropdownMonHoc v-if="hasMonHoc" />
            <LazyAtomsDropdownNamKhaoSat v-if="hasNamKhaoSat" />
        </div>
    </el-card>
</template>