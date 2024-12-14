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
const idSinhVien = ref('')

const formLabelAlign = reactive({
    firstName: '',
    lastName: '',
    classRoom: '',
})
const dropDownLop = ref('')

// Functions
const closeModal = () => {
    emit('closeModal')
    centerDialogVisible.value = false
}

const initializeData = () => {
    idSinhVien.value = get(props.data, 'id', '')
    formLabelAlign.firstName = get(props.data, 'firstName', '')
    formLabelAlign.lastName = get(props.data, 'lastName', '')
    dropDownLop.value = get(props.data, 'classRoom.id', '')
}

const handleEdit = async () => {
    const { data } = await adminStore.editSinhVien(idSinhVien.value, formLabelAlign.firstName, formLabelAlign.lastName, dropDownLop.value)

    if (data.value) {
        emit('refreshData')
    }

    closeModal()
}
</script>

<template>
    <el-dialog v-model="centerDialogVisible" title="Sửa sinh viên" width="500" align-center @close="closeModal"
        @open="initializeData">
        <span>
            <el-form label-position="top" label-width="auto" :model="formLabelAlign" style="max-width: 600px">
                <el-form-item label="Họ">
                    <el-input v-model="formLabelAlign.firstName" />
                </el-form-item>
                <el-form-item label="Tên">
                    <el-input v-model="formLabelAlign.lastName" />
                </el-form-item>

                <AtomsDropdownLop v-model="dropDownLop" />
            </el-form>
        </span>
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