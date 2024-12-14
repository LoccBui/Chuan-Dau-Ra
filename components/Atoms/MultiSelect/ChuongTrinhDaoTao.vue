<script lang="ts" setup>
import _ from 'lodash'


// Store
const dropdownStore = useDropdownStore()
const model = defineModel('')

// States
const { data: options, pending } = await dropdownStore.fetchDropdownChuongTrinhDaoTao()
</script>

<template>
    <el-select v-model="model" :loading="pending" multiple placeholder="Chọn chương trình đào tạo">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.code" />
    </el-select>
</template>
