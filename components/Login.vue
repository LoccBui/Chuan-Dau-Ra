<script lang="ts" setup>
import _ from 'lodash'

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

const submitForm = useDebounce(async () => {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
            isLoading.value = true
            const { data } = await auth.login(form.username, form.password)
            
            if (!_.isEmpty(data.value)) {
                navigateTo("/dashboard/plo-va-pi")
            }

            isLoading.value = false
        }
    })
})
</script>

<template>
    <div class="min-w-96 w-full h-full flex flex-col items-center justify-center px-4 gap-3 text-center">
        <div class="heading-primary">Chuẩn đầu ra</div>

        <div class="tracking-widest">Thay đổi để tạo ra sự khác biệt</div>

        <el-divider class="!m-0" />


        <el-form class="w-full" ref="ruleFormRef" :rules="rules" label-position="top" label-width="auto" :model="form"
            status-icon>
            <el-form-item label="Tài khoản" prop="username" class="w-full">
                <el-input placeholder="Nhập tài khoản" v-model="form.username" autofocus @keyup.enter="submitForm" />
            </el-form-item>
            <el-form-item label="Mật khẩu" prop="password" class="w-full">
                <el-input placeholder="Nhập mật khẩu" type="password" show-password v-model="form.password"
                    @keyup.enter="submitForm" />
            </el-form-item>
        </el-form>

        <span class="text-end w-full">
            <el-link @click="navigateTo('/register')" type="primary">Chưa có tài khoản?</el-link>
        </span>

        <el-button size="large" :loading="isLoading" class="w-full" type="primary" @click="submitForm">
            Đăng nhập
        </el-button>
    </div>
</template>