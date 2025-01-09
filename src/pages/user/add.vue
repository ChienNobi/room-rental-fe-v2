<script setup lang="ts">
import { AxiosError } from 'axios'
import { emailValidator, phoneNumberValidator, requiredValidator } from '@validators'
import { ROLES, USER_STATUSES } from '@/constants/common'

import { useSnackbar } from '@core/components/Snackbar/useSnackbar'
import { register } from '@/api/auth'

const { successNotify, errorNotify } = useSnackbar()
const router = useRouter()

const user = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  address: '',
  confirm_password: '',
  is_active: USER_STATUSES[0].value,
})

const rePasswordValidator = (value: string) => {
  return (user.password && value === user.password) || 'Passwords do not match'
}

const savePost = async () => {
  try {
    await register({ ...user, is_active: true })

    successNotify('Thêm mới tài khoản thành công')
    await router.push({ name: 'user' })
  }
  catch (e) {
    if (e instanceof AxiosError)
      errorNotify(e.response?.data?.message || e.message)
  }
}
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-4">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Thêm mới người dùng
        </h4>
      </div>

      <div class="d-flex gap-4 align-center flex-wrap">
        <VBtn @click="savePost">Lưu</VBtn>
      </div>
    </div>

    <VRow>
      <VCol md="8">
        <VCard class="mb-4" title="Thông tin chung">
          <VCardText>
            <AppTextField
              v-model="user.name"
              label="Họ và tên"
              :rules="[requiredValidator]"
              placeholder="Họ và tên"
              class="mb-4"
            />
            <AppTextField
              v-model="user.email"
              label="Email"
              :rules="[requiredValidator, emailValidator]"
              placeholder="user@gmail.com"
              type="email"
              class="mb-4"
            />

            <AppTextField
              v-model="user.phone"
              label="Số điện thoại"
              :rules="[requiredValidator, phoneNumberValidator]"
              placeholder="0868 68 68 68"
              class="mb-4"
            />

            <AppTextarea
              v-model="user.address"
              :rules="[requiredValidator]"
              label="Địa chỉ"
              class="mb-4"
            />

            <AppTextField
              v-model="user.password"
              label="Mật khẩu"
              :rules="[requiredValidator]"
              placeholder=""
              class="mb-4"
              type="password"
            />

            <AppTextField
              v-model="user.confirm_password"
              label="Nhập lại mật khẩu"
              :rules="[requiredValidator, rePasswordValidator]"
              placeholder=""
              class="mb-4"
              type="password"
            />

            <AppSelect
              v-model="user.role"
              placeholder="Role"
              label="Role"
              :rules="[requiredValidator]"
              :items="ROLES"
              prepend-inner-icon="mdi-account-group"
              class="mb-4"
            />

            <AppSelect
              v-model="user.is_active"
              placeholder="Trạng thái"
              label="Trạng thái"
              :items="USER_STATUSES"
              :rules="[requiredValidator]"
              class="mb-4"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
