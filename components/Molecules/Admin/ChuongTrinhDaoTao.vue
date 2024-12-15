<script lang="ts" setup></script>

<template>
    <LayoutContainer>

        <AtomsHeading class="text-center w-full" title="Nhập danh sách chương trình đào tạo" />

        <MoleculesTableDanhSachKhoa />

        <div class="gap-4 grid grid-cols-1 lg:grid-cols-2">
            <LazyMoleculesTableDanhSachNganh />
            <LazyMoleculesTableDanhSachCTDT />
        </div>

    </LayoutContainer>

</template>