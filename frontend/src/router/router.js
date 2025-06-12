import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../view/LoginView.vue'
import RegisterView from '../view/RegisterView.vue'

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
