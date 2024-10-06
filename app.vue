<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig()

const fetch = useFetchStore()


fetch.fetchResources()

useHead({
  title: appConfig.title
})
</script>