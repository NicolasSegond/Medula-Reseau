<template>
  <div class="bg-slate-900 rounded-lg p-8 shadow-xl max-w-md mx-auto">
    <h2 class="text-2xl font-semibold text-center mb-2 text-white">
      {{ isLogin ? 'Se connecter' : 'Créer un compte' }}
    </h2>
    <p class="text-gray-400 text-center mb-6">
      {{ isLogin ? 'Entrez vos identifiants pour accéder à votre compte' : 'Inscrivez-vous pour rejoindre la communauté' }}
    </p>

    <form @submit.prevent="submit" class="space-y-5">
      <!-- En login, on utilise email + password ; en register, username + email + password -->

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

    <div class="mt-6 text-center">
      <button class="text-indigo-400 hover:text-indigo-300 text-sm" v-if="isLogin">
        Mot de passe oublié ?
      </button>
    </div>

    <div class="mt-6 text-center">
      <button @click="isLogin = !isLogin" class="text-indigo-400 hover:text-indigo-300 text-sm">
        {{ isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà inscrit ? Se connecter" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login, register } from '@/services/authService'

const emit = defineEmits(['authenticated'])

const isLogin = ref(true)
const form = ref({
  username: '',
  email: '',
  password: ''
})

const submit = async () => {
  if (isLogin.value) {
    // Pour login, on envoie email + password
    const { email, password } = form.value
    const res = await login({ email, password })
    emit('authenticated', res.message)
  } else {
    // Pour register, on envoie username + email + password
    const res = await register(form.value)
    emit('authenticated', res.message)
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
