<script lang="ts" setup>
const props = defineProps<{
    isOpenModal: boolean
    programId: string | number
}>()

// Store
const adminStore = useAdminStore()

// State
const centerDialogVisible = computed(() => props.isOpenModal)
const emit = defineEmits(['closeModal', 'refreshData'])

const ruleFormRef = ref()
const form = reactive({
    code: '',
    name: '',
})

const rules = reactive({
    code: [
        { required: true, message: 'Vui lòng nhập mã chương trình đào tạo', trigger: 'blur' },
    ],
    name: [
        { required: true, message: 'Vui lòng nhập tên chương trình đào tạo', trigger: 'blur' },
    ],
})

// Functions
const closeModal = () => {
    emit('closeModal')
    centerDialogVisible.value = false
}

const handleAdd = useDebounce(async () => {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
            const { data } = await adminStore.addCTDT(String(props.programId), form.code, form.name)

            if (data.value) {
                emit('refreshData')
            }
        }
    })
})
</script>

<template>
    <el-dialog v-model="centerDialogVisible" width="500" align-center @close="closeModal">

        <el-form class="w-full" ref="ruleFormRef" :rules="rules" label-position="top" label-width="auto" :model="form"
            status-icon>
            <el-form-item label="Mã chương trình đào tạo" prop="code">
                <el-input placeholder="Nhập mã chương trình đào tạo" v-model="form.code" autofocus />
            </el-form-item>
            <el-form-item label="Tên chương trình đào tạo" prop="name">
                <el-input placeholder="Nhập tên chương trình đào tạo" v-model="form.name" />
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