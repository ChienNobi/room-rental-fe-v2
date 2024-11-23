<script setup lang="ts">
import { AxiosError } from 'axios'
import { emailValidator, phoneNumberValidator, requiredValidator } from '@validators'
import type { PostStatus } from '@/constants/common'
import { FURNITURE_TYPES, POST_STATUSES, ROLES } from '@/constants/common'

import { postApi } from '@/api/post.api'
import { useSnackbar } from '@core/components/Snackbar/useSnackbar'

const { successNotify, errorNotify } = useSnackbar()

const user = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  address: '',
  confirm_password: '',
})

const router = useRouter()

const savePost = async (status: PostStatus) => {
  try {
    const images = ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Golden_tabby_and_white_kitten_n01.jpg/1200px-Golden_tabby_and_white_kitten_n01.jpg']

    await postApi.save({ ...user, status, images, lat: '1', lon: '2' })
    successNotify('Thêm mới bài đăng thành công')
    await router.push({ name: 'post' })
  }
  catch (e) {
    if (e instanceof AxiosError)
      errorNotify(e.message || e.response?.data?.message)
  }
}
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-4">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Thêm mới user
        </h4>
      </div>

      <div class="d-flex gap-4 align-center flex-wrap">
        <VBtn @click="savePost(POST_STATUSES.PUBLISH)">Lưu</VBtn>
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
              v-model="user.title"
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
              v-model="user.confir_password"
              label="Nhập lại mật khẩu"
              :rules="[requiredValidator]"
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
          </VCardText>
        </VCard>
      </VCol>

      <VCol md="4" cols="12">
        <!-- 👉 Price -->
        <!--        <VCard title="Thiết lập giá" class="mb-4"> -->
        <!--          <VCardText> -->
        <!--            <AppTextField -->
        <!--              v-model="post.rent_fee" label="Giá thuê" -->
        <!--              placeholder="20" -->
        <!--              class="mb-4" -->
        <!--              :rules="[requiredValidator, integerValidator]" -->
        <!--              prepend-inner-icon="mdi-currency-usd" -->
        <!--            /> -->

        <!--            <AppTextField -->
        <!--              v-model="post.electricity_fee" -->
        <!--              label="Giá điện" -->
        <!--              placeholder="5k/số" -->
        <!--              class="mb-4" -->
        <!--              prepend-inner-icon="mdi-lightning-bolt" -->
        <!--              suffix="/số" -->
        <!--              :rules="[integerValidator]" -->
        <!--            /> -->

        <!--            <AppTextField -->
        <!--              v-model="post.water_fee" -->
        <!--              label="Giá nước" -->
        <!--              prepend-inner-icon="mdi-faucet" -->
        <!--              suffix="/m³" -->
        <!--              :rules="[integerValidator]" -->
        <!--              class="mb-4" -->
        <!--            /> -->

        <!--            <AppTextField -->
        <!--              v-model="post.internet_fee" -->
        <!--              label="Cước internet" -->
        <!--              prepend-inner-icon="mdi-web" -->
        <!--              :rules="[integerValidator]" -->
        <!--              class="mb-4" -->
        <!--            /> -->

        <!--            <AppTextField -->
        <!--              v-model="post.extra_fee" -->
        <!--              label="Phí dịch vụ" -->
        <!--              prepend-inner-icon="mdi-account-wrench" -->
        <!--              :rules="[integerValidator]" -->
        <!--              class="mb-4" -->
        <!--            /> -->
        <!--          </VCardText> -->
        <!--        </VCard> -->
      </VCol>
    </VRow>
  </div>
</template>
