<script lang="ts" setup>
const selection = ref('')
const fetchStore = useFetchStore()
const emit = defineEmits(['changeKhoa'])

const { data: listFaculties, pending } = await fetchStore.fetchKhoa()

const changeSelection = () => {
    console.log('changeSelection khoa');
    fetchStore.khoaSelection = selection.value
}
</script>

<template>
    <div class="flex items-center gap-10">
        <span class="min-w-60">Khoa</span>

        <el-select :loading="pending" v-model="selection" placeholder="Chọn khoa" @change="changeSelection">
            <el-option v-for="item in listFaculties" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
    </div>
</template>