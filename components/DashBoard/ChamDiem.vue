<script lang="ts" setup>

</script>

<template>
    <el-card shadow="never">
        <AtomsHeading class="text-center" type="sub" title="Nhập điểm các CLO" />

        <div class="grid grid-cols-2 gap-4">
            <MoleculesDropdownKhoaNganhCNDT hasMonHoc hasNamKhaoSat @changeKhoa="test1" @changeNganh="test2" />
            <MoleculesTableNhapDiem />
        </div>
    </el-card>
</template>
