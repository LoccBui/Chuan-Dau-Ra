<script lang="ts" setup>
interface Props {
    isOpenModal: boolean
    title?: string
}

const props = withDefaults(defineProps<Props>(), {
    isOpenModal: false,
    title: 'Bạn có muốn xóa dữ liệu ?',
})

const centerDialogVisible = computed(() => props.isOpenModal)
const emit = defineEmits(['closeModal', 'confirmDelete'])

const confirm = () => {
    emit('confirmDelete')
}

const closeModal = () => {
    emit('closeModal')
}
</script>

<template>
    <el-dialog v-model="centerDialogVisible" :title="props.title" width="500" align-center @close="closeModal">
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeModal">Hủy</el-button>
                <el-button type="danger" @click="confirm">
                    Xóa
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>