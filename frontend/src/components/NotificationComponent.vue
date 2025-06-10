<template>
  <transition name="fade-slide">
    <div
        v-if="visible"
        class="fixed bottom-6 right-6 w-[300px] bg-gradient-to-br from-slate-800 to-slate-700 text-white px-5 py-4 rounded-2xl shadow-xl border border-slate-600 backdrop-blur-md"
    >
      <div class="flex items-start justify-between">
        <div class="flex gap-3 items-start">
          <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p class="text-sm font-medium leading-snug">{{ message }}</p>
        </div>
        <button @click="close" class="text-slate-400 hover:text-white transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="mt-3 h-1 w-full bg-slate-600/50 rounded overflow-hidden">
        <div class="h-full bg-green-400 animate-progress"></div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
defineProps({
  message: String
});
const visible = ref(true)

const close = () => {
  visible.value = false
}

onMounted(() => {
  setTimeout(() => {
    close()
  }, 4000)
})
</script>

<style scoped>
@keyframes progress {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}

.animate-progress {
  animation: progress 2.9s linear forwards;
}
</style>
