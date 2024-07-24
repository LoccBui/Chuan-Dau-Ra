<script lang="ts" setup>
export interface Props {
    isOpenModal: boolean
    title?: string
}

const props = withDefaults(defineProps<Props>(), {
    isOpenModal: false,
    title: 'Xóa',
})

const centerDialogVisible = computed(() => props.isOpenModal)
const emit = defineEmits(['closeModal'])

const confirm = () => {
    emit('closeModal')

}

const closeModal = () => {
    centerDialogVisible.value = false
    emit('closeModal')
}
</script>

<template>
    <el-dialog v-model="centerDialogVisible" :title="props.title" width="500" align-center @close="closeModal">
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeModal">Hủy</el-button>
                <el-button type="danger" @click="confirm">
                    Xác nhận
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>