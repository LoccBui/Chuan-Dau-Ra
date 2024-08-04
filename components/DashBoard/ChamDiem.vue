<script lang="ts" setup>

</script>

<template>
    <el-card shadow="never">
        <AtomsHeading class="text-center" type="sub" title="Nhập điểm các CLO" />

        <MoleculesDropdownKhoaNganhCNDT hasMonHoc @changeKhoa="test1" @changeNganh="test2" />
    </el-card>
</template>
