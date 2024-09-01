<script lang="ts" setup>
const test1 = () => {
    console.log('test1')
}
</script>

<template>
    <LayoutCard>

        <AtomsHeading class="text-center" type="sub" title="Nhập điểm các CLO" />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

            <LayoutCard>
                <AtomsDropdownKhoa @changeKhoa="test1" />
                <AtomsDropdownNganh @changeNganh="test1" />
                <AtomsDropdownChuongTrinhDT @changeCTDT="test1" />
                <AtomsDropdownMonHoc @changeMonHoc="test1" />
                <AtomsDropdownNamKhaoSat @changeNamKhaoSat="test1" />
            </LayoutCard>

            <MoleculesTableNhapDiem />

        </div>

    </LayoutCard>
</template>
