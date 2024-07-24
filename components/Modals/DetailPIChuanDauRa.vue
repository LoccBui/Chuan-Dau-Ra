<template>
    <el-dialog v-model="centerDialogVisible" title="Warning" width="500" align-center @close="test">
        <span>Open the dialog from the center from the screen</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="centerDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
const props = defineProps<{
    isOpenModal: boolean
}>()

const centerDialogVisible = computed(() => props.isOpenModal)
const emit = defineEmits(['closeModal'])

const test = () => {
    emit('closeModal')
    centerDialogVisible.value = false
}

</script>