<script lang="ts" setup>
import { useDropdownStore } from '~/stores/dropdown.store';

export interface Props {
    programId?: string | number,
    schoolYear?: string,
}

const props = withDefaults(defineProps<Props>(), {})

// Store
const dropdownStore = useDropdownStore()

// States
const isAdding = ref(false)
const optionName = ref('')
const model = defineModel()

// Emit
const emit = defineEmits(['changeLop'])

// Functions
const { data, pending, refresh } = await dropdownStore.fetchDropdownLop()

const isPassValidation = () => {
    if (!props.schoolYear) {
        useShowToast('Cần nhập niên khóa', 'warning')
        return false
    }

    if (!props.programId) {
        useShowToast('Cần chọn ngành', 'warning')
        return false
    }

    if (!optionName.value) {
        useShowToast('Cần nhập tên lớp', 'warning')
        return false
    }

    return true
}

const onConfirm = async () => {
    if (isPassValidation()) {
        const { data, pending } = await dropdownStore.addNewLop(String(optionName.value), String(props.schoolYear), Number(props.programId))

        clear()

        if (data.value) {
            useShowToast('Thêm thành công lớp', 'success')
            refresh()
        }
    }
}

const clear = () => {
    optionName.value = ''
    isAdding.value = false
}
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">Lớp</span>
        <el-select v-model="model" placeholder="Chọn lớp">

            <el-option v-for="(classItem, index) in data" :loading="pending" :key="index" :label="classItem.name"
                :value="classItem.id" />


            <template #footer>
                <el-button v-if="!isAdding" text bg size="small" @click="isAdding = true">
                    Thêm lớp
                </el-button>
                <template v-else>
                    <el-input v-model="optionName" placeholder="Thêm lớp" size="small" />
                    <div class="mt-2">
                        <el-button type="primary" size="small" @click="onConfirm">
                            Thêm
                        </el-button>
                        <el-button size="small" @click="clear">Hủy</el-button>
                    </div>
                </template>
            </template>
        </el-select>
    </div>
</template>