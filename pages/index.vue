<script lang="ts" setup></script>


<template>
    <div class="container">
        <div class="login__wrapper">
            <Login />
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    @apply bg-[--primary-color] w-full max-w-screen-2xl h-screen flex items-center justify-center;

    .login {
        $self: &;

        &__wrapper {
            @apply w-96 h-96 bg-white rounded-[--main-border];
        }
    }
}
</style>