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
const programId = ref('')
const facultyId = ref('')

const ruleFormRef = ref()
const form = reactive({
    code: '',
    name: '',
})

const rules = reactive({
    code: [
        { required: true, message: 'Vui lòng nhập mã ngành', trigger: 'blur' },
    ],
    name: [
        { required: true, message: 'Vui lòng nhập tên ngành', trigger: 'blur' },
    ],
})

// Functions
const closeModal = () => {
    emit('closeModal')
    centerDialogVisible.value = false
}

const initializeData = () => {
    programId.value = get(props.data, 'id', '')
    form.code = get(props.data, 'code', '')
    form.name = get(props.data, 'name', '')
}

const handleEdit = async () => {
    const { data } = await adminStore.editNganh(programId.value, form.code, form.name, Number(facultyId.value))

    if (data.value) {
        emit('refreshData')
    }

    closeModal()
}
</script>

<template>
    <el-dialog v-model="centerDialogVisible" title="Sửa ngành" width="500" align-center @close="closeModal"
        @open="initializeData">

        <el-form class="w-full" ref="ruleFormRef" :rules="rules" label-position="top" label-width="auto" :model="form"
            status-icon>
            <el-form-item label="Mã ngành" prop="code">
                <el-input placeholder="Nhập mã ngành" v-model="form.code" autofocus />
            </el-form-item>
            <el-form-item label="Tên ngành" prop="name">
                <el-input placeholder="Nhập tên ngành" v-model="form.name" />
            </el-form-item>
            <AtomsDropdownKhoa @changeKhoa="(id) => facultyId = id" />
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