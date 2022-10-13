const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Post = require('../models/Post');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    console.log(token, "token");
    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, data) => {
            if (err) {
                res.status(403).json({err: 'invalid token'})
            } else {
                next();
            }
        })
    } else {
        res.status(403).json({err: 'missing token'})
    }
}


router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.all
        res.json(posts)
    } catch (err) {
        res.status(500).send({ err })
    }
})

module.exports = router