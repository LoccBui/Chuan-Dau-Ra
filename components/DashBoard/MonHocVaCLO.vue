<script lang="ts" setup>
const test1 = (value) => {
    alert(value)
}

const test2 = (value) => {
    alert(value)
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <AtomsHeading class="text-center w-full" title="Tương thích giữa môn học và chuẩn đầu ra (CLO)" />

        <MoleculesDropdownKhoaNganhCNDT @changeKhoa="test1" @changeNganh="test2" />

        <el-card shadow="never">
            <div class="flex flex-col gap-4">
                <AtomsDropdownMaMon @changeMaMon="test1" />
                <AtomsDropdownNamKhaoSat @changeNamKhaoSat="test1" />
                <AtomsDropdownCLO @changeCLO="test1" />
                <AtomsInputDiemCanDat />

                <LayoutButton>
                    <el-button type="primary">Thêm</el-button>
                    <el-button>Sửa</el-button>
                </LayoutButton>
            </div>
        </el-card>

        <LazyMoleculesTableMonHocVaChuanDauRa />
    </div>
</template>