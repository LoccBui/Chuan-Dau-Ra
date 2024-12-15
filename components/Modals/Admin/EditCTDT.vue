<script lang="ts" setup>
import { get, isEmpty } from 'lodash'

const props = defineProps<{
    isOpenModal: boolean
    data: object
    dataNganh: object
}>()

// Store
const adminStore = useAdminStore()

// State
const centerDialogVisible = computed(() => props.isOpenModal)
const emit = defineEmits(['closeModal', 'refreshData'])
const facultyId = ref('')
const programId = ref('')

const ruleFormRef = ref()
const form = reactive({
    code: '',
    name: '',
})

const rules = reactive({
    code: [
        { required: true, message: 'Vui lòng nhập mã khoa', trigger: 'blur' },
    ],
    name: [
        { required: true, message: 'Vui lòng nhập tên khoa', trigger: 'blur' },
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
}

const handleEdit = async () => {
    const idNganh = ref('')

    if (!programId.value) {
        idNganh.value = props.dataNganh?.id // Old id
    } else {
        idNganh.value = programId.value // new id
    }

    const { data } = await adminStore.editCTDT(String(facultyId.value), form.name, form.code, Number(idNganh.value))

    if (data.value) {
        emit('refreshData')
    }

    closeModal()
}

const changeNganh = (item: any) => {
    programId.value = ''
    programId.value = item?.id // New nganh
}
</script>

<template>
    <el-dialog v-model="centerDialogVisible" title="Sửa khoa" width="500" align-center @close="closeModal"
        @open="initializeData">

        <el-form class="w-full" ref="ruleFormRef" :rules="rules" label-position="top" label-width="auto" :model="form"
            status-icon>
            <el-form-item label="Mã khoa" prop="code">
                <el-input placeholder="Nhập mã khoa" v-model="form.code" autofocus />
            </el-form-item>
            <el-form-item label="Tên khoa" prop="name">
                <el-input placeholder="Nhập tên khoa" v-model="form.name" />
            </el-form-item>

            <AtomsDropdownKhoa />

            <div class="mt-4">
                <AtomsDropdownNganh @changeNganh="changeNganh" />
            </div>
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