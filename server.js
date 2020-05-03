const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const root = require('./controllers/root');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'tomtom123',
        database: 'smart-brain'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => root.getUsers(req, res, db));

app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt));

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));

app.get('/profile/:id', (req, res) => profile.getByID(req, res, db));

app.put('/image', (req, res) => image.increment(req, res, db));

app.listen(3000, ()=>{
    console.log('App is Running on port 3000');
})

/*

/--> res = this is working

/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT = user

*/