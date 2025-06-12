import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import { findUserByEmail, createUser, getAllUsers } from './services/user.service.js'
import { hashPassword, verifyPassword } from './utils/hash.util.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))

app.post('/register', async (req, res) => {
    const { email, password, username } = req.body
    if (!email || !password || !username) {
        return res.status(400).json({ message: 'Champs requis manquants' })
    }

    try {
        const existing = await findUserByEmail(email)
        if (existing) {
            return res.status(409).json({ message: 'Utilisateur déjà existant' })
        }

        const hashed = await hashPassword(password)
        const user = await createUser({ email, password: hashed, username })
        res.status(201).json({ message: 'Utilisateur créé', user })
    } catch (err) {
        res.status(500).json({ message: err.message || 'Erreur serveur' })
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'Champs requis manquants' })
    }

    try {
        const user = await findUserByEmail(email)
        if (!user || !(await verifyPassword(password, user.password))) {
            return res.status(401).json({ message: 'Identifiants invalides' })
        }

        res.status(200).json({ message: 'Connexion réussie', username: user.username })
    } catch (err) {
        res.status(500).json({ message: err.message || 'Erreur serveur' })
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message || 'Erreur serveur' })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`✅ Serveur Users lancé sur le port ${PORT}`)
})
