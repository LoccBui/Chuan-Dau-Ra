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
const subjectId = ref('')

const ruleFormRef = ref()
const form = reactive({
    code: '',
    name: '',
    soTiet: '',
    soTinChi: '',
})

const rules = reactive({
    code: [
        { required: true, message: 'Vui lòng nhập mã môn', trigger: 'blur' },
    ],
    name: [
        { required: true, message: 'Vui lòng nhập tên môn', trigger: 'blur' },
    ],
    soTiet: [
        { required: true, message: 'Vui lòng nhập số tiết', trigger: 'blur' },
    ],
    soTinChi: [
        { required: true, message: 'Vui lòng nhập số tín chỉ', trigger: 'blur' },
    ],
})

// Functions
const closeModal = () => {
    emit('closeModal')
    centerDialogVisible.value = false
}

const initializeData = () => {
    subjectId.value = get(props.data, 'id', '')
    form.code = get(props.data, 'code', '')
    form.name = get(props.data, 'name', '')
    form.soTiet = get(props.data, 'soTiet', '')
    form.soTinChi = get(props.data, 'soTinChi', '')
}

const handleEdit = async () => {
    const { data } = await adminStore.editMonHoc(subjectId.value, form.code, form.name, Number(form.soTiet), Number(form.soTinChi))

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
            <el-form-item label="Mã môn" prop="code">
                <el-input type="number" placeholder="Nhập mã môn" v-model="form.code" autofocus />
            </el-form-item>
            <el-form-item label="Tên môn" prop="name">
                <el-input placeholder="Nhập tên môn" v-model="form.name" autofocus />
            </el-form-item>
            <el-form-item label="Số tiết" prop="soTiet">
                <el-input type="number" placeholder="Nhập số tiết" v-model="form.soTiet" autofocus />
            </el-form-item>
            <el-form-item label="Số tín chỉ" prop="soTinChi">
                <el-input type="number" placeholder="Nhập số tín chỉ" v-model="form.soTinChi" autofocus />
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