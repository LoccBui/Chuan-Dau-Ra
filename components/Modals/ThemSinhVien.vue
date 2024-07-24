<script lang="ts" setup>
const props = defineProps<{
    isOpenModal: boolean
}>()

const centerDialogVisible = computed(() => props.isOpenModal)
const emit = defineEmits(['closeModal'])


const formLabelAlign = reactive({
    name: '',
    region: '',
    type: '',
})

const closeModal = () => {
    emit('closeModal')
    centerDialogVisible.value = false
}

</script>

<template>
    <el-dialog v-model="centerDialogVisible" title="Thêm sinh viên" width="500" align-center @close="closeModal">
        <span>
            <el-form label-position="top" label-width="auto" :model="formLabelAlign" style="max-width: 600px">
                <el-form-item label="Khoa">
                    <el-input v-model="formLabelAlign.name" />
                </el-form-item>
                <el-form-item label="Ngành">
                    <el-input v-model="formLabelAlign.region" />
                </el-form-item>
                <el-form-item label="Lớp">
                    <el-input v-model="formLabelAlign.type" />
                </el-form-item>
                <el-form-item label="Niên Khóa">
                    <el-input v-model="formLabelAlign.type" />
                </el-form-item>
            </el-form>
        </span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeModal">Hủy</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">
                    Thêm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>