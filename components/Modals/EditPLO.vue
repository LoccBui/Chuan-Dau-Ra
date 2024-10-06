<script lang="ts" setup>
import _ from 'lodash'

const props = defineProps<{
    isOpenModal: boolean
    data: any
}>()

const fetchStore = useFetchStore()
const centerDialogVisible = computed(() => props.isOpenModal)
const emit = defineEmits(['closeModal', 'refreshData'])
const ruleFormRef = ref()

const form = reactive({
    idPLO: '',
    ploCode: '',
    descriptions: '',
})

const rules = reactive({
    ploCode: [
        { required: true, message: 'Vui lòng nhập mã PLO', trigger: 'blur' },
    ],
    descriptions: [
        { required: true, message: 'Vui lòng nhập nội dung PLO', trigger: 'blur' },
    ],
})

const handleClose = () => {
    emit('closeModal')
    centerDialogVisible.value = false
}

const initializeData = () => {
    form.idPLO = _.get(props, 'data.id')
    form.ploCode = _.get(props, 'data.code')
    form.descriptions = _.get(props, 'data.description')
}

const handleConfirm = useDebounce(async () => {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
            const { data } = await fetchStore.editPLO(form.idPLO, form.ploCode, form.descriptions, fetchStore.ctdtSelection)

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
    <el-dialog v-model="centerDialogVisible" title="Sửa" align-center @open="initializeData" @close="handleClose">
        <el-form ref="ruleFormRef" label-position="top" label-width="auto" :rules="rules" :model="form"
            @submit.prevent="handleConfirm">
            <!-- Code -->
            <el-form-item label="Mã PLO" prop="ploCode">
                <el-input placeholder="Ví dụ: PLO1" v-model="form.ploCode" autofocus />
            </el-form-item>
            <!-- Description -->
            <el-form-item label="Nội dung PLO" prop="descriptions" @keyup.enter="handleConfirm">
                <el-input v-model="form.descriptions" />
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