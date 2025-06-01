import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import supabase from './shared/supabase.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.get('/users', async (req, res) => {
    const { data, error } = await supabase.from('users').select('*')
    if (error) {
        return res.status(500).json({ error: error.message })
    }
    res.json(data)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`✅ Users service running on port ${PORT}`)
})
