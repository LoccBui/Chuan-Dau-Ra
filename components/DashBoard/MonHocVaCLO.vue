<script lang="ts" setup>
const test1 = (value: string) => {
    console.log(value);
}

const input = (value: string) => {
    console.log(value);
}
</script>

<template>
    <LayoutContainer>
        <AtomsHeading class="text-center w-full" title="Tương thích giữa môn học và chuẩn đầu ra (CLO)" />

        <LayoutCard>
            <AtomsDropdownKhoa @changeKhoa="test1" />
            <AtomsDropdownNganh @changeNganh="test1" />
            <AtomsDropdownChuongTrinhDT @changeCTDT="test1" />
        </LayoutCard>

        <LayoutCard>
            <AtomsDropdownMaMon @changeMaMon="test1" />
            <AtomsDropdownNamKhaoSat @changeNamKhaoSat="test1" />
            <AtomsDropdownCLO @changeCLO="test1" />
            <AtomsInputDiemCanDat @changeInput="input" />

            <LayoutButton>
                <el-button type="primary">Thêm</el-button>
                <el-button>Sửa</el-button>
            </LayoutButton>
        </LayoutCard>

        <MoleculesTableMonHocVaChuanDauRa />
    </LayoutContainer>
</template>