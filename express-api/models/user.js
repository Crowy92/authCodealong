const db = require('../dbConfig');

class User {
    constructor(data){
        this.username = data.username
        this.email = data.email
        this.passwordDigest = data.password_digest
    }
    
    static get all(){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT * FROM users;`);
                let users = result.rows.map(r => new User(r))
                res(users)
            } catch (err) {
                rej(`Error retrieving users: ${err.message}`)
            }
        })
    }

    static create({ username, email, password }){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO users (username, email, password_digest)
                                                VALUES ($1, $2, $3) RETURNING *;`, [username, email, password]);
                let user = new User(result.rows[0]);
                res(user)
            } catch (err) {
                rej(`Error creating user: ${err.message}`)
            }
        })
    }

    static findByEmail(email){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT * FROM users
                                                WHERE email = $1;`, [email]);
                let user = new User(result.rows[0])
                res(user)
            } catch (err) {
                rej(`Error retrieving user: ${err.message}`)
            }
        })
    }
}

module.exports = User;