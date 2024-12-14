<script lang="ts" setup>
import _ from 'lodash'

export interface Props {
    dataTransfer: any
    subjectId: number | string
}

const props = withDefaults(defineProps<Props>(), {})

// Store
const dropdownStore = useDropdownStore()
const adminStore = useAdminStore()

// States
const multiSelect = ref([])

const { data: options, pending } = await dropdownStore.fetchDropdownChuongTrinhDaoTao()

// Watcher
watch(
    () => props.dataTransfer,
    () => {
        multiSelect.value.length = 0 // Reset 

        // Kiểm tra chương trình đào tạo nào đã có trong môn học
        props.dataTransfer.educationProgramSubjects.forEach((item) => {
            multiSelect.value.push(item.educationProgram.name)
        })
    }
)

// Functions
const save = async () => {
    const listCTDT = options.value
        .filter(option => multiSelect.value.includes(option.name))
        .map(item => item.id)

    const { data } = await adminStore.addMultipleCTDTToMonHoc(String(props.subjectId), listCTDT)

    if (data.value) {
        await adminStore.fetchListMonHoc()
    }
}
</script>

<template>
    <LayoutCard>

        <el-table :data="[dataTransfer]" empty-text="Không có dữ liệu">
            <el-table-column prop="code" label="Mã môn" width="100" />
            <el-table-column prop="name" label="Tên môn" width="200" />
            <el-table-column label="Chương trình đào tạo">
                <div v-if="_.size(dataTransfer) > 0">
                    <el-select v-model="multiSelect" :loading="pending" multiple
                        placeholder="Chọn chương trình đào tạo">
                        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name" />
                    </el-select>
                </div>
            </el-table-column>
        </el-table>

        <el-button type="primary" @click="save"> Lưu </el-button>

    </LayoutCard>
</template>
