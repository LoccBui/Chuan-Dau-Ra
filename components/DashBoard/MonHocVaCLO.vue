<script lang="ts" setup>
import _ from 'lodash'

const idCTDT = ref(-1)

const changeCTDT = () => {
    console.log('this is for testing ');
}

const input = (value: string) => {
    console.log(value);
}

const inputMaMon = ref('')
const inputCLO = ref('')
const inputDiem = ref('')

const setInputValue = (dataSelections: any) => {
    inputMaMon.value = ''
    inputCLO.value = ''
    inputDiem.value = ''
}
</script>

<template>
    <LayoutContainer>
        <AtomsHeading class="text-center w-full" title="Tương thích giữa môn học và chuẩn đầu ra (CLO)" />

        <LayoutCard>
            <AtomsDropdownKhoa @changeKhoa="changeCTDT" />
            <AtomsDropdownNganh @changeNganh="changeCTDT" />
            <AtomsDropdownChuongTrinhDT @changeCTDT="(ctdtID) => idCTDT = ctdtID" />
        </LayoutCard>

        <LayoutCard v-show="idCTDT >= 0">
            <AtomsInputMaMon v-model="inputMaMon" @changeMaMon="changeCTDT" />
            <AtomsInputCLO v-model="inputCLO" @changeCLO="changeCTDT" />
            <AtomsInputDiemCanDat v-model="inputDiem" @changeInput="input" />
            <AtomsDropdownNamKhaoSat @changeNamKhaoSat="changeCTDT" />

            <LayoutButton>
                <el-button type="primary" @click="changeCTDT">Thêm</el-button>
                <el-button> Sửa </el-button>
            </LayoutButton>
        </LayoutCard>

        <MoleculesTableMonHocVaChuanDauRa :idCTDT="idCTDT" @changeMonHocTable="setInputValue" />
    </LayoutContainer>
</template>