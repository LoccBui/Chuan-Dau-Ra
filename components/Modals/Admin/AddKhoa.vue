<script lang="ts" setup>
import { get } from 'lodash'

const props = defineProps<{
    isOpenModal: boolean
}>()

// Store
const adminStore = useAdminStore()

// State
const centerDialogVisible = computed(() => props.isOpenModal)
const emit = defineEmits(['closeModal', 'refreshData'])

const ruleFormRef = ref()
const form = reactive({
    code: '',
    name: '',
    description: '',
})

const rules = reactive({
    code: [
        { required: true, message: 'Vui lòng nhập mã khoa', trigger: 'blur' },
    ],
    name: [
        { required: true, message: 'Vui lòng nhập tên khoa', trigger: 'blur' },
    ],
    description: [
        { required: true, message: 'Vui lòng nhập mô tả khoa', trigger: 'blur' },
    ],
})

// Functions
const closeModal = () => {
    emit('closeModal')
    centerDialogVisible.value = false
}

const handleAdd = useDebounce(async () => {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
            const { data } = await adminStore.addNewKhoa(form.code, form.name, form.description)

            if (data.value) {
                emit('refreshData')
            }
        }
    })
})
</script>

<template>
    <el-dialog v-model="centerDialogVisible" width="500" align-center @close="closeModal">

        <el-form class="w-full" ref="ruleFormRef" :rules="rules" label-position="top" label-width="auto" :model="form"
            status-icon>
            <el-form-item label="Mã khoa" prop="code">
                <el-input placeholder="Nhập mã khoa" v-model="form.code" autofocus />
            </el-form-item>
            <el-form-item label="Tên khoa" prop="name">
                <el-input placeholder="Nhập tên khoa" v-model="form.name" />
            </el-form-item>
            <el-form-item label="Mô tả khoa">
                <el-input placeholder="Nhập mô tả khoa" v-model="form.soTiet" />
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeModal">Hủy</el-button>
                <el-button type="primary" @click="handleAdd">
                    Thêm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>