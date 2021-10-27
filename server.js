const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'root',
    database : 'smartbrain'
  }
});

const {
  registerController, 
  loginController, 
  profileController, 
  clarifaiController
} = require('./controllers');


const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());



app.get('/', (req, res)=> { res.send('Connected to smart-brain-api') })
app.post('/login', loginController.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { registerController.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profileController.handleProfileGet(req, res, db)})
app.put('/count', (req, res) => { clarifaiController.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { clarifaiController.handleApiCall(req, res)})



app.listen(process.env.PORT || 3030, () => {
  console.log(`Running on port ${process.env.PORT}`)
});