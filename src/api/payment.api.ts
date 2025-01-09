import request from '@axios'

export const getPaymentUrl = async (params): Promise => {
  return request.get('api_admin/payments/payment-url', { params })
}
