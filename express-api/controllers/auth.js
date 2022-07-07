const express = require('express');
const router = express.Router();


const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {
        await User.create({...req.body})
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        res.status(500).json({err});
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByEmail(req.body.email)
        if(!user){ throw new Error('No user with this email') }
        const authed = req.body.password === user.passwordDigest
        if (!!authed){
            res.status(200).json({ user: user.username })
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({ err: err.message });
    }
})

module.exports = router