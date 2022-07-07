const db = require('../dbConfig');

class Post {
    constructor(data) {
        this.body = data.body
        this.username = data.username
    }

    static get all(){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT posts.*, users.username as username
                                                    FROM posts 
                                                    JOIN users ON posts.user_id = users.id;`);
                let posts = result.rows.map(r => new Post(r))
                res(posts)
            } catch (err) {
                rej(`Error retrieving posts: ${err}`)
            }
        })
    }
}

module.exports = Post