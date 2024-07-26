<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig()


useHead({
  title: appConfig.title
})
</script>