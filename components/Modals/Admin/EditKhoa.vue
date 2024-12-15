<script lang="ts" setup>
import { get } from 'lodash'

const props = defineProps<{
    isOpenModal: boolean
    data: object
}>()

// Store
const adminStore = useAdminStore()

// State
const centerDialogVisible = computed(() => props.isOpenModal)
const emit = defineEmits(['closeModal', 'refreshData'])
const facultyId = ref('')

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

const initializeData = () => {
    facultyId.value = get(props.data, 'id', '')
    form.code = get(props.data, 'code', '')
    form.name = get(props.data, 'name', '')
    form.description = get(props.data, 'description', '')
}

const handleEdit = async () => {
    const { data } = await adminStore.editKhoa(facultyId.value, form.code, form.name, form.description)

    if (data.value) {
        emit('refreshData')
    }

    closeModal()
}
</script>

<template>
    <el-dialog v-model="centerDialogVisible" title="Sửa sinh viên" width="500" align-center @close="closeModal"
        @open="initializeData">

        <el-form class="w-full" ref="ruleFormRef" :rules="rules" label-position="top" label-width="auto" :model="form"
            status-icon>
            <el-form-item label="Mã khoa" prop="code">
                <el-input placeholder="Nhập mã khoa" v-model="form.code" autofocus />
            </el-form-item>
            <el-form-item label="Tên khoa" prop="name">
                <el-input placeholder="Nhập tên khoa" v-model="form.name" />
            </el-form-item>
            <el-form-item label="Mô tả khoa" prop="soTiet">
                <el-input placeholder="Nhập mô tả khoa" v-model="form.description" />
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeModal">Hủy</el-button>
                <el-button type="primary" @click="handleEdit">
                    Sửa
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>