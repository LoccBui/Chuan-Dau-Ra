<template>
    <el-container>
        <el-aside class="!w-48 sticky left-0 top-0 h-screen overflow-y-auto !overflow-x-hidden">
            <MenuNavigation class="w-auto" />
        </el-aside>

        <el-main class="p-2 max-w-screen-xl w-full mx-auto min-h-full my-auto">
            <NuxtPage />
        </el-main>

    </el-container>
</template>