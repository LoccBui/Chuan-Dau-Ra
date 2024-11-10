<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig()

const fetch = useFetchStore()
const auth = useAuthStore()


if (auth.token) {
  fetch.fetchResources()
}

useHead({
  title: appConfig.title
})
</script>