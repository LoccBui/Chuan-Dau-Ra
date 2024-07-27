<script lang="ts" setup>
const props = defineProps<{
    isOpenModal: boolean
    data: any
}>()

const centerDialogVisible = computed(() => props.isOpenModal)
const emit = defineEmits(['closeModal'])

const handleClose = () => {
    emit('closeModal')
    centerDialogVisible.value = false
}

const handleConfirm = () => {
    checkModify()
    emit('closeModal')
    centerDialogVisible.value = false
}

const inputDate = ref('')

const initializeData = () => {
    inputDate.value = props.data.date
}


const checkModify = () => {
    if (inputDate.value !== props.data.date) {
        alert('data changes so send requests to the server')
    } else {
        alert('data not changes')
    }
}
</script>

<template>
    <el-dialog v-model="centerDialogVisible" title="Sửa" width="500" align-center @open="initializeData"
        @close="handleClose">
        <span>{{ props.data }}</span>
        <div class="flex flex-col gap-4">
            <el-input v-model="inputDate">
                <template #prepend>PLO</template>
            </el-input>
            <el-input v-model="inputDate">
                <template #prepend>Nội dung PLO</template>
            </el-input>
        </div>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleClose">Đóng</el-button>
                <el-button type="primary" @click="handleConfirm">
                    Xác nhận
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>