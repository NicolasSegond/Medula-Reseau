import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../view/LoginView.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginView,
    },
    // Tu pourras ajouter d’autres routes ici
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
