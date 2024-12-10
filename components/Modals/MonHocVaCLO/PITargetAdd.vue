<script lang="ts" setup>
import _ from 'lodash'

const props = defineProps<{
    isOpenModal: boolean
    piId: number | string
    schoolYear: string
}>()

const monHocVaChuanDauRaStore = useMonHocVaChuanDauRaStore()
const centerDialogVisible = computed(() => props.isOpenModal)
const emit = defineEmits(['closeModal', 'refreshData'])
const ruleFormRef = ref()

const form = reactive({
    diemCanDat: '',
})

const rules = reactive({
    diemCanDat: [
        { required: true, message: 'Vui lòng nhập điểm cần đạt', trigger: 'blur' },
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
            const { data } = await monHocVaChuanDauRaStore.addPITarget(
                Number(props.piId), 
                Number(form.diemCanDat),
                String(props.schoolYear),
            )

            if (data.value) {
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

            <el-form-item label="Điểm cần đạt" prop="diemCanDat">
                <el-input type="number" v-model="form.diemCanDat" />
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