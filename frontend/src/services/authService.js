import axios from 'axios'

const API_URL = 'http://localhost:8000/users' // Proxyé via Kong

export async function login({ username, password }) {
    try {
        const res = await axios.post(`${API_URL}/login`, { username, password })
        return { success: true, message: `Bienvenue ${res.data.username}` }
    } catch (err) {
        return { success: false, message: 'Identifiants invalides' }
    }
}

export async function register({ username, email, password }) {
    try {
        const res = await axios.post(
            `${API_URL}/register`,
            { username, email, password },
            { headers: { 'Content-Type': 'application/json' } }
        )

        console.log('res', res.data)

        return { success: true, message: `Bienvenue ${res.data.user.username}, un email de confirmation vous a été envoyé.` }
    } catch (err) {
        return { success: false, message: 'Erreur lors de l\'inscription' + ' : ' + err.response?.data?.message || '' }
    }
}

export async function getUser(){
    try {
        const res = await axios.get(`${API_URL}/users`)
        return { success: true, user: res.data }
    } catch (err) {
        return { success: false, message: err.response?.data?.error || 'Erreur lors de la récupération de l\'utilisateur' + ' : ' + err.message }
    }
}
