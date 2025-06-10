import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bcrypt from 'bcrypt'
import sql from './shared/db.js' // Assurez-vous que ce fichier existe et est correctement configuré

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.post('/register', async (req, res) => {
    const { email, password, username } = req.body

    console.log('Received registration request:', { email, username })

    if (!email || !password || !username) {
        return res.status(400).json({ message: 'Email, password and username are required' })
    }

    try {
        // Vérifier si utilisateur existe déjà
        const existingUsers = await sql`
            SELECT id FROM users WHERE email = ${email} LIMIT 1
        `

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'L\'utilisateur existe déjà '})
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10)

        // Insérer utilisateur
        const insertedUsers = await sql`
            INSERT INTO users (email, password, username)
            VALUES (${email}, ${hashedPassword}, ${username})
            RETURNING id, email, username
        `

        return res.status(201).json({
            message: 'Utilisateur créé avec succès',
            user: insertedUsers[0]
        })
    } catch (err) {
        return res.status(500).json({ message: err.message || 'Erreur serveur' })
    }
})

// LOGIN
app.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' })
    }

    try {
        // Récupérer l'utilisateur par email
        const users = await sql`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `

        if (users.length === 0) {
            return res.status(401).json({ error: 'L\'utilisateur n\'existe pas' })
        }

        const user = users[0]

        // Comparer les mots de passe
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Mot de passe invalide' })
        }

        // Ici, tu peux générer un JWT ou un autre token d'authentification
        // Par exemple avec jsonwebtoken (à installer):
        // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.json({ message: 'Login successful', username: user.username })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await sql`SELECT id, email, username FROM users`
        res.json(users)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`✅ Users service running on port ${PORT}`)
})
