<template>
  <div class="min-h-screen bg-slate-950 text-gray-200 flex flex-col">
    <!-- Auth Screen -->
    <div v-if="!currentUser" class="min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="flex justify-center mb-8">
          <div class="bg-indigo-600 rounded-full p-3">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="ml-3 text-2xl font-medium text-gray-200 self-center">SocialApp</span>
        </div>

        <!-- Auth Card -->
        <div class="bg-slate-900 rounded-lg p-8 shadow-xl">
          <h2 class="text-2xl font-semibold text-center mb-2">
            {{ isLogin ? 'Se connecter' : 'Create Account' }}
          </h2>
          <p class="text-gray-400 text-center mb-6">
            {{ isLogin ? 'Enter your credentials to access your account' : 'Sign up to join our community' }}
          </p>

          <form @submit.prevent="isLogin ? login() : register()" class="space-y-5">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-400 mb-1">Username</label>
              <input
                  v-model="authForm.username"
                  id="username"
                  type="text"
                  required
                  class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <input
                  v-model="authForm.password"
                  id="password"
                  type="password"
                  required
                  class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
            </div>

            <button
                type="submit"
                class="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-md hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {{ isLogin ? 'Sign In' : 'Create Account' }}
            </button>
          </form>

          <div class="mt-6 text-center">
            <button
                @click="isLogin = !isLogin"
                class="text-indigo-400 hover:text-indigo-300 text-sm"
            >
              {{ isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in" }}
            </button>
          </div>

          <div class="mt-6 relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-700"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-slate-900 text-gray-400">OR</span>
            </div>
          </div>

          <div class="mt-6 space-y-3">
            <button class="w-full flex items-center justify-center py-2 px-4 bg-slate-800 border border-slate-700 rounded-md hover:bg-slate-750 focus:outline-none focus:ring-2 focus:ring-slate-500">
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              Continue with Google
            </button>
            <button class="w-full flex items-center justify-center py-2 px-4 bg-slate-800 border border-slate-700 rounded-md hover:bg-slate-750 focus:outline-none focus:ring-2 focus:ring-slate-500">
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"/>
              </svg>
              Continue with Apple
            </button>
          </div>
        </div>

        <div class="mt-8 text-center text-sm text-gray-500">
          © 2025 SocialApp. All rights reserved.
        </div>
      </div>
    </div>

    <!-- Notification -->
    <div
        v-if="notification"
        class="fixed bottom-4 right-4 bg-slate-800 text-white px-4 py-2 rounded-md shadow-lg transition-all duration-300"
        :class="notification ? 'opacity-100' : 'opacity-0'"
    >
      {{ notification }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive state
const currentUser = ref(null)
const isLogin = ref(true)
const notification = ref('')

// Auth form
const authForm = ref({
  username: '',
  password: ''
})

// Mock data
const users = ref([
  { username: 'alice', password: 'password', following: ['bob', 'charlie'], followers: ['bob', 'diana'] },
  { username: 'bob', password: 'password', following: ['alice', 'charlie'], followers: ['alice', 'diana'] },
  { username: 'charlie', password: 'password', following: ['alice'], followers: ['alice', 'bob', 'diana'] },
  { username: 'diana', password: 'password', following: ['alice', 'bob', 'charlie'], followers: [] },
  { username: 'eve', password: 'password', following: [], followers: ['alice'] }
])

// Methods
const login = () => {
  const user = users.value.find(u =>
      u.username === authForm.value.username &&
      u.password === authForm.value.password
  )

  if (user) {
    currentUser.value = user
    authForm.value = { username: '', password: '' }
    showNotification('Welcome back!')
  } else {
    showNotification('Invalid credentials')
  }
}

const register = () => {
  const existingUser = users.value.find(u => u.username === authForm.value.username)

  if (existingUser) {
    showNotification('Username already exists')
    return
  }

  const newUser = {
    username: authForm.value.username,
    password: authForm.value.password,
    following: [],
    followers: []
  }

  users.value.push(newUser)
  currentUser.value = newUser
  authForm.value = { username: '', password: '' }
  showNotification('Account created successfully!')
}

const showNotification = (message) => {
  notification.value = message
  setTimeout(() => {
    notification.value = ''
  }, 3000)
}
</script>

<style scoped>
/* Smooth transitions */
* {
  transition: all 0.2s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #1e293b;
}

::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>