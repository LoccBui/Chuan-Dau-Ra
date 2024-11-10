<script lang="ts" setup>
const props = defineProps<{
    isOpenModal: boolean,
    idCTDT: number
}>()

const fetchStore = useFetchStore()
const centerDialogVisible = computed(() => props.isOpenModal)
const emit = defineEmits(['closeModal', 'refreshData'])
const ruleFormRef = ref()

const form = reactive({
    code: '',
    description: '',
})

const rules = reactive({
    code: [
        { required: true, message: 'Vui lòng nhập mã PLO', trigger: 'blur' },
    ],
})

const closeModal = () => {
    emit('closeModal')
    centerDialogVisible.value = false
}

const handleAdd = useDebounce(async () => {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
            const { data } = await fetchStore.addNewPLO(form.code, props.idCTDT, form.description)

            if (data.value) {
                ruleFormRef.value.resetFields()
                emit('refreshData')
            }
        }
    })
})
</script>

<template>
    <el-dialog v-model="centerDialogVisible" title="Thêm PLO" align-center @close="closeModal">

        <el-form ref="ruleFormRef" :rules="rules" label-position="top" label-width="auto" :model="form"
            @submit.prevent="handleAdd">
            <!-- ID -->
            <el-form-item label="Nhập mã PLO" prop="code">
                <el-input placeholder="Ví dụ: PLO1" v-model="form.code" autofocus />
            </el-form-item>

            <!-- Description -->
            <el-form-item label="Nhập nội dung PLO" prop="description" @keyup.enter="handleAdd">
                <el-input v-model="form.description" />
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