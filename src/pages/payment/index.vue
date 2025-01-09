<script setup lang="ts">
import { getPaymentUrl } from '@/api/payment.api'
import qrSvg from '@images/svg/qr.svg'
import { minIntegerValidator, requiredValidator } from '@validators'

const totalMoney = ref<number>(0)
const loading = ref<boolean>(false)

const handleContinue = async (validate: SubmitEvent) => {
  try {
    loading.value = true

    const result = await validate

    if (!result.valid)
      return

    const res = await getPaymentUrl({ amount: totalMoney.value })

    if (res.data?.value)
      window.location.href = res.data.value
  }
  catch (e) {
    errorNotify('Vui long thử lại sau hoặc liên hệ với bộ phận hỗ trợ')
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <VCard title="Nạp tiền vào tài khoản">
    <VForm @submit.prevent="handleContinue">
      <VCardText>
        <AppTextField
          v-model="totalMoney"
          label="Nhập số tiền bạn muốn nạp"
          placeholder="Nạp từ 100.000 đ trở lên"
          :rules="[requiredValidator, minIntegerValidator(totalMoney, 100000)]"
          class="mb-4"
        />

        <p class="v-card-title !tw-px-0">Phương thức thanh toán</p>

        <div class="tw-flex tw-items-center tw-gap-2 tw-shadow-custom tw-rounded-sm tw-w-fit tw-px-4 tw-py-2 tw-mb-8 tw-mt-2">
          <img :src="qrSvg" class="tw-w-[60px]" alt="vn-pay">
          <div>Thanh toán bằng mã QR (VNPAY)</div>
        </div>

        <VBtn :loading="loading" type="submit">Tiếp tục</VBtn>
      </VCardText>
    </VForm>
  </VCard>
</template>

<style lang="scss" scoped>

</style>
