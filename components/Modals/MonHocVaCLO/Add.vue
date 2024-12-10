<script lang="ts" setup>
import _ from 'lodash'

const props = defineProps<{
    isOpenModal: boolean
    data: any,
    idCTDT: number,
    tableData: []
}>()

const monHocVaChuanDauRaStore = useMonHocVaChuanDauRaStore()
const centerDialogVisible = computed(() => props.isOpenModal)
const emit = defineEmits(['closeModal', 'refreshData'])
const ruleFormRef = ref()

const form = reactive({
    mon: '',
    clo: '',
    noiDungClo: '',
    cauHoi: '',
    diemToiDa: ''
})

const rules = reactive({
    mon: [
        { required: true, message: 'Vui lòng nhập tên môn', trigger: 'blur' },
    ],
    clo: [
        { required: true, message: 'Vui lòng nhập mã clo', trigger: 'blur' },
    ],
    noiDungClo: [
        { required: true, message: 'Vui lòng nhập nội dung clo', trigger: 'blur' },
    ],
    cauHoi: [
        { required: true, message: 'Vui lòng nhập câu hỏi', trigger: 'blur' },
    ],
    diemToiDa: [
        { required: true, message: 'Vui lòng nhập điểm tối đa', trigger: 'blur' },
    ],
})

const handleClose = () => {
    ruleFormRef.value.resetFields()
    emit('closeModal')
}

const handleConfirm = useDebounce(async () => {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
            const { data } = await monHocVaChuanDauRaStore.addNewMonHoc(form.clo, Number(form.mon.id), Number(form.diemToiDa), form.cauHoi, props.idCTDT)

            if (data.value) {
                ruleFormRef.value.resetFields()
                emit('refreshData')
                emit('closeModal')
            }
        }
    })
})
</script>

<template>
    <el-dialog v-model="centerDialogVisible" title="Thêm" align-center @close="handleClose">
        <el-form ref="ruleFormRef" label-position="top" label-width="auto" :rules="rules" :model="form"
            @submit.prevent="handleConfirm">

            <el-form-item label="Tên môn" prop="mon">
                <el-select v-model="form.mon" placeholder="Chọn môn">
                    <el-option v-for="item in props.tableData" :key="item.id" :label="item.name" :value="item" />
                </el-select>
            </el-form-item>

            <el-form-item label="CLO" prop="clo" @keyup.enter="handleConfirm">
                <el-input v-model="form.clo" />
            </el-form-item>

            <el-form-item label="Nội dung CLO" prop="noiDungClo" @keyup.enter="handleConfirm">
                <el-input v-model="form.noiDungClo" />
            </el-form-item>

            <el-form-item label="Câu hỏi" prop="cauHoi" @keyup.enter="handleConfirm">
                <el-input v-model="form.cauHoi" />
            </el-form-item>

            <el-form-item label="Điểm tối đa" prop="diemToiDa" @keyup.enter="handleConfirm">
                <el-input type="number" v-model="form.diemToiDa" />
            </el-form-item>

        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleClose">Đóng</el-button>
                <el-button type="primary" @click="handleConfirm">
                    Thêm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>