<script lang="ts" setup>
import _ from 'lodash'

const props = defineProps<{
    isOpenModal: boolean
    data: any,
    idCTDT: number
}>()

const fetchStore = useFetchStore()
const centerDialogVisible = computed(() => props.isOpenModal)
const emit = defineEmits(['closeModal', 'refreshData'])

const ruleFormRef = ref()

const form = reactive({
    tenMon: '',
    nhomCauHoi: '',
    clo: '',
    noiDungCLo: '',
    diemToiDa: '',
    diemCanDat: '',
})

const rules = reactive({
    tenMon: [
        { required: true, message: 'Vui lòng nhập tên môn', trigger: 'blur' },
    ],
    nhomCauHoi: [
        { required: true, message: 'Vui lòng nhập nhóm câu hỏi', trigger: 'blur' },
    ],
    clo: [
        { required: true, message: 'Vui lòng nhập clo', trigger: 'blur' },
    ],
    noiDungCLo: [
        { required: true, message: 'Vui lòng nhập nội dung CLO', trigger: 'blur' },
    ],
    diemToiDa: [
        { required: true, message: 'Vui lòng nhập điểm tối đa', trigger: 'blur' },
    ],
    diemCanDat: [
        { required: true, message: 'Vui lòng nhập điểm cần đạt', trigger: 'blur' },
    ],
})

const handleClose = () => {
    emit('closeModal')
    centerDialogVisible.value = false
}

const initializeData = () => {
    console.log(props.data);
    form.tenMon = _.get(props, 'data.name')
    
    // form.soTiet = _.get(props, 'data.soTiet')
    // form.soTinChi = _.get(props, 'data.soTinChi')
}

const handleConfirm = useDebounce(async () => {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
            // const { data } = await fetchStore.editPLO(form.idPLO, form.ploCode, form.descriptions, props.idCTDT)

            // if (data.value) {
            //     ruleFormRef.value.resetFields()
            //     emit('refreshData')
            //     emit('closeModal')
            // }
        }
    })
})
</script>

<template>
    <el-dialog v-model="centerDialogVisible" title="Sửa" align-center @open="initializeData" @close="handleClose">
        <el-form ref="ruleFormRef" label-position="top" label-width="auto" :rules="rules" :model="form"
            @submit.prevent="handleConfirm">

            <el-form-item label="Tên môn" prop="tenMon" @keyup.enter="handleConfirm">
                <el-input v-model="form.tenMon" />
            </el-form-item>
            
            <el-form-item label="Nhóm câu hỏi" prop="nhomCauHoi" @keyup.enter="handleConfirm">
                <el-input v-model="form.nhomCauHoi" />
            </el-form-item>
            
            <el-form-item label="CLO" prop="clo" @keyup.enter="handleConfirm">
                <el-input v-model="form.clo" />
            </el-form-item>
            
            <el-form-item label="Nội dung CLO" prop="noiDungCLo" @keyup.enter="handleConfirm">
                <el-input v-model="form.noiDungCLo" />
            </el-form-item>

            <el-form-item label="Điểm tối đa" prop="diemToiDa" @keyup.enter="handleConfirm">
                <el-input type="number" v-model="form.diemToiDa" />
            </el-form-item>

            <el-form-item label="Điểm cần đạt" prop="diemCanDat" @keyup.enter="handleConfirm">
                <el-input type="number" v-model="form.diemCanDat" />
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleClose">Đóng</el-button>
                <el-button type="primary" @click="handleConfirm">
                    Sửa
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>