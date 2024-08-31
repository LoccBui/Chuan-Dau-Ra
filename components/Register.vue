<script lang="ts" setup>
const auth = useAuthStore()
const gui = useAuthStore()

const ruleFormRef = ref()
const isLoading = ref(false)

const form = reactive({
    username: '',
    password: '',
    confirmPassword: '',
})

const rules = reactive({
    username: [
        { required: true, message: 'Vui lòng nhập tài khoản', trigger: 'blur' },
        { min: 3, max: 10, message: 'Tài khoản nên từ 3 - 10 kí tự' },
    ],
    password: [
        { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
        { min: 3, max: 10, message: 'Mật khẩu nên từ 3 - 10 kí tự' },
    ],
    confirmPassword: [
        { required: true, message: 'Vui lòng xác nhận mật khẩu', trigger: 'blur' },
        { min: 3, max: 10, message: 'Mật khẩu nên từ 3 - 10 kí tự' },
    ],
})

const submitForm = async () => {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
            isLoading.value = true
            const res = await auth.register(form.username, form.password)

            if (res) {
                useShowToast('Đăng ký thành công', 'success')
                navigateTo('/')
            }

            isLoading.value = false
        }
    })
}
</script>

<template>
    <div class="min-w-96 w-full h-full flex flex-col items-center justify-center px-4 gap-3 text-center">
        <AtomsHeading title="Đăng kí" />
        <el-form class="w-full" ref="ruleFormRef" :rules="rules" label-position="top" label-width="auto" :model="form"
            status-icon>
            <el-form-item label="Tài khoản" prop="username" class="w-full">
                <el-input placeholder="Nhập tài khoản" v-model="form.username" autofocus @keyup.enter="submitForm" />
            </el-form-item>
            <el-form-item label="Mật khẩu" prop="password" class="w-full">
                <el-input placeholder="Nhập mật khẩu" type="password" show-password v-model="form.password"
                    @keyup.enter="submitForm" />
            </el-form-item>
            <el-form-item label="Xác nhận mật khẩu" prop="confirmPassword" class="w-full">
                <el-input placeholder="Xác nhận mật khẩu" type="password" show-password v-model="form.confirmPassword"
                    @keyup.enter="submitForm" />
            </el-form-item>
        </el-form>

        <el-button size="large" :loading="isLoading" class="w-full" type="primary" @click="submitForm">
            Đăng kí
        </el-button>
    </div>
</template>