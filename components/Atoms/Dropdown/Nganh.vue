<script lang="ts" setup>
import _ from 'lodash'

const selection = ref('')
const fetchStore = useFetchStore()
const emit = defineEmits(['changeNganh'])

const listItems = computed(() => {
  return fetchStore.faculties.find(faculty => faculty.id === fetchStore.khoaSelection) || []
})

const changeSelection = () => {
    console.log(selection.value);
    fetchStore.ctdtSelection = selection.value
    fetchStore.nganhSelection = selection.value
}
</script>

<template>
    <div class="flex items-center gap-10">
        
        <span class="min-w-60">Ngành</span>
        
        <el-select v-model="selection" placeholder="Chọn ngành" @change="changeSelection">
            <el-option 
                v-for="item in _.get(listItems, 'programs', [])" 
                :key="item.id" 
                :label="item.name" 
                :value="item.id" 
            />
        </el-select>
    </div>
</template>