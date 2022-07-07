const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors('*'));
app.use(express.json());

const controllers = require('./controllers');

app.use('/posts', controllers.posts);
app.use('/users', controllers.users);
app.use('/auth', controllers.auth);

app.get('/', (req, res) => res.json({ message: 'Welcome' }));

module.exports = app