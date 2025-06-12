<template>
  <div class="bg-slate-900 rounded-lg p-8 shadow-xl max-w-md mx-auto">
    <h2 class="text-2xl font-semibold text-center mb-2 text-white">
      {{ isLogin ? 'Se connecter' : 'Créer un compte' }}
    </h2>
    <p class="text-gray-400 text-center mb-6">
      {{ isLogin ? 'Entrez vos identifiants pour accéder à votre compte' : 'Inscrivez-vous pour rejoindre la communauté' }}
    </p>

    <form @submit.prevent="submit" class="space-y-5">
      <div v-if="!isLogin">
        <label for="username" class="block text-sm font-medium text-gray-400 mb-1">Nom d'utilisateur</label>
        <input v-model="form.username" id="username" type="text" required class="input text-white" />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-400 mb-1">Email</label>
        <input v-model="form.email" id="email" type="email" required class="input text-white" />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-400 mb-1">Mot de passe</label>
        <input v-model="form.password" id="password" type="password" required class="input text-white" />
      </div>

      <button type="submit" class="btn-primary">
        {{ isLogin ? 'Connexion' : 'Créer un compte' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, register } from '@/services/authService'

const props = defineProps({
  mode: {
    type: String,
    default: 'login', // 'login' ou 'register'
  },
})

const emit = defineEmits(['authenticated'])

const router = useRouter()
const isLogin = ref(props.mode === 'login')

const form = ref({
  username: '',
  email: '',
  password: ''
})

const submit = async () => {
  if (isLogin.value) {
    const { email, password } = form.value
    const res = await login({ email, password })
    emit('authenticated', res.message)
  } else {
    const res = await register(form.value)
    emit('authenticated', res.message)
    if (res.success) {
      router.push({ path: '/login', query: { message: res.message } })
    }
  }
}
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500;
}
.btn-primary {
  @apply w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-md hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900;
}
</style>
