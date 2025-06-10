import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import supabase from './shared/db.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.get('/products', async (req, res) => {
    const { data, error } = await supabase.from('products').select('*')
    if (error) {
        return res.status(500).json({ error: error.message })
    }
    res.json(data)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`✅ Products service running on port ${PORT}`)
})
