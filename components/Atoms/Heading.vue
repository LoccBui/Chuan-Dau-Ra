<script lang="ts" setup>
export interface Props {
    title: string,
    type?: 'heading' | 'sub',
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Title',
    type: 'heading',
    class: ''
})
</script>

<template>
    <h1 v-if="type === 'heading'" :class="class" class="text-primary"> {{ title }}</h1>
    <h2 v-if="type === 'sub'" :class="class" class="sub-primary"> {{ title }}</h2>
</template>