<script lang="ts" setup>
import { menu } from '~/types/Menu'

definePageMeta({
    layout: 'dashboard'
})

const route = useRoute()

// Retutn the component name based on the route params
const categoryName = computed(() => {
    const foundMenu = menu.find(item => item.params === route.params.category)
    return foundMenu ? foundMenu.component : 'Undefined Category'
})

const isComponent = (componentName: string) => categoryName.value === componentName
</script>

<template>
    <div class="w-full">
        <LazyDashBoardMonHocVaCLO v-if="isComponent('MonHocVaCLO')" />
        <LazyDashBoardDeCuongChiTiet v-if="isComponent('DeCuongChiTiet')" />
        <LazyDashBoardPLOVaPI v-if="isComponent('PLOVaPI')" />
        <LazyDashBoardNhapMap v-if="isComponent('NhapMap')" />
        <LazyDashBoardAdmin v-if="isComponent('Admin')" />
        <LazyDashBoardKetQuaDanhGiaMonHoc v-if="isComponent('KetQuaDanhGiaMonHoc')" />
        <LazyDashBoardKetQuaDanhGiaChuongTrinhDaoTao v-if="isComponent('KetQuaDanhGiaChuongTrinhDaoTao')" />
        <LazyDashBoardBaoCaoTongHopCTDT v-if="isComponent('BaoCaoTongHopCTDT')" />
        <LazyDashBoardChamDiem v-if="isComponent('ChamDiem')" />
    </div>
</template>