import sql from '../shared/db.js'

export async function findUserByEmail(email) {
    const [user] = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`
    return user
}

export async function createUser({ email, password, username }) {
    const [user] = await sql`
        INSERT INTO users (email, password, username)
        VALUES (${email}, ${password}, ${username})
        RETURNING id, email, username
    `
    return user
}

export async function getAllUsers() {
    return await sql`SELECT id, email, username FROM users`
}
