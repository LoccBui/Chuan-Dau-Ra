<script lang="ts" setup>
const auth = useAuthStore()

const ruleFormRef = ref()
const isLoading = ref(false)

const form = reactive({
    username: '',
    password: '',
})

const rules = reactive({
    username: [
        { required: true, message: 'Vui lòng nhập tài khoản', trigger: 'blur' },
        { min: 3, max: 10, message: 'Tài khoản nên từ 3 - 10 kí tự', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
        { min: 3, max: 10, message: 'Mật khẩu nên từ 3 - 10 kí tự', trigger: 'blur' },
    ],
})

const submitForm = async () => {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(async (valid, fields) => {
        if (valid) {
            isLoading.value = true
            const res = await auth.login(form.username, form.password)

            if (res.value) {
                isLoading.value = false
                navigateTo("/dashboard/plo-va-pi")
            } else {
                isLoading.value = false
            }
        }
    })
}
</script>

<template>
    <div class="wrapper">
        <div class="text-primary">Đăng nhập</div>

        <el-form ref="ruleFormRef" :rules="rules" label-position="top" label-width="auto" :model="form" status-icon>
            <el-form-item label="Tài khoản" prop="username">
                <el-input placeholder="Nhập tài khoản" v-model="form.username" autofocus @keyup.enter="submitForm" />
            </el-form-item>
            <el-form-item label="Mật khẩu" prop="password">
                <el-input placeholder="Nhập mật khẩu" type="password" show-password v-model="form.password"
                    @keyup.enter="submitForm" />
            </el-form-item>
        </el-form>

        <el-button size="large" :loading="isLoading" class="action" type="primary" @click="submitForm">Đăng
            nhập</el-button>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    @apply w-full h-full flex flex-col items-center justify-center p-4 gap-4;

    form,
    .action {
        @apply w-full;
    }
}
</style>