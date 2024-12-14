<script lang="ts" setup>
const dataMonHoc = ref({})
const subjectId = ref('')

const handleTranferMonHoc = (dataSelection: any) => {
    if (dataSelection) {
        dataMonHoc.value = dataSelection
        subjectId.value = dataSelection.id
    }
}
</script>

<template>
    <div class="flex gap-2">
        <div class="w-1/2">
            <MoleculesTableDanhSachMonHoc @transferMonHoc="handleTranferMonHoc" />
        </div>
        <div class="flex-1">
            <MoleculesTableDanhSachMonHocTransferMonHoc :subjectId="subjectId" :dataTransfer="dataMonHoc" />
        </div>
    </div>


    <div class="mt-2">
        <MoleculesAdminMonHocTheoCTDT />
    </div>
</template>