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

const inputCLO = ref('')
const inputDescription = ref('')


const initializeData = () => {
    console.log('open');
    inputCLO.value = props.data.code
    inputDescription.value = props.data.description
}


const checkModify = () => {
    if (inputDescription.value !== props.data.date) {
        alert('data changes so send requests to the server')
    } else {
        alert('data not changes')
    }
}
</script>

<template>
    <el-dialog v-model="centerDialogVisible" title="Sửa" align-center @open="initializeData" @close="handleClose">

        <div class="flex flex-col gap-4">
            <el-input v-model="inputCLO" readonly>
                <template #prepend>PLO</template>
            </el-input>
            <el-input v-model="inputDescription">
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