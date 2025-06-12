<template>
  <div class="min-h-screen flex items-center justify-center p-4  bg-slate-950">
    <div class="w-full max-w-md">
      <Logo />
      <AuthForm @authenticated="handleAuthenticated" />
      <Notification v-if="notification" :message="notification" />
    </div>
  </div>
</template>

<script setup>
import AuthForm from '../components/AuthForm.vue'
import Notification from '../components/NotificationComponent.vue'
import Logo from '../components/LogoComponent.vue'
import { ref } from 'vue'

const notification = ref('')
const handleAuthenticated = (message) => {
  notification.value = message
  setTimeout(() => (notification.value = ''), 3000)
}
</script>
