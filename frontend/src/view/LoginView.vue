<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-slate-950">
    <div class="w-full max-w-md">
      <Logo />
      <AuthForm mode="login" @authenticated="handleAuthenticated" />
      <Notification v-if="notification" :message="notification" />
      <div class="text-center mt-4">
        <RouterLink to="/register" class="text-indigo-400 hover:text-indigo-300 text-sm">Pas encore de compte ? S’inscrire</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import AuthForm from '../components/AuthForm.vue'
import Notification from '../components/NotificationComponent.vue'
import Logo from '../components/LogoComponent.vue'

const route = useRoute()
const notification = ref('')

const handleAuthenticated = (message) => {
  notification.value = message
  setTimeout(() => (notification.value = ''), 3000)
}

onMounted(() => {
  if (route.query.message) {
    notification.value = route.query.message
    // Supprimer le message de l'URL sans recharger la page
    window.history.replaceState({}, document.title, route.path)
    setTimeout(() => (notification.value = ''), 3000)
  }
})
</script>
