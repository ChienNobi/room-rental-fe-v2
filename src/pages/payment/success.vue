<script>
export default {
  name: 'PaymentSuccess',
  methods: {
    goToDashboard() {
      // Redirect to the dashboard or homepage
      this.$router.push('/dashboard')
    },
  },
}
</script>

<template>
  <div class="payment-success">
    <div class="icon-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="success-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2l4-4m1-5.5A7.5 7.5 0 113.5 16A7.5 7.5 0 0116 3.5z"
        />
      </svg>
    </div>
    <h1>Payment Successful!</h1>
    <p>Your payment has been processed successfully. Thank you for your purchase!</p>
    <button class="btn-primary" @click="goToDashboard">Go to Dashboard</button>
  </div>
</template>

<style scoped>
.payment-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.icon-container {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  background-color: #e0f7e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-icon {
  width: 40px;
  height: 40px;
  color: #28a745;
}

h1 {
  font-size: 24px;
  color: #28a745;
  margin: 10px 0;
}

p {
  font-size: 16px;
  color: #555;
  margin: 10px 0;
}

.btn-primary {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #218838;
}
</style>
