const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        await User.create({...req.body, password: hashed})
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        res.status(500).json({err});
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByEmail(req.body.email)
        if(!user){ throw new Error('No user with this email') }
        // const authed = req.body.password === user.passwordDigest
        const authed = bcrypt.compare(req.body.password, user.passwordDigest)
        if (!!authed){
            console.log(user);
            const payload = {username: user.username, email: user.email}
            const sendToken = ( err, token ) => {
                if (err) { throw new Error('Error in token generation')}
                res.status(200).json({
                    success: true,
                    token: token
                })
            }
            jwt.sign(payload, process.env.SECRET, {expiresIn:60}, sendToken)
            // res.status(200).json({ user: user.username })
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({ err: err.message });
    }
})

module.exports = router