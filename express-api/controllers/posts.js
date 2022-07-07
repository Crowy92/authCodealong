const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.all
        res.json(posts)
    } catch (err) {
        res.status(500).send({ err })
    }
})

module.exports = router