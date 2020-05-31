const express = require('express');
const bodyParser = require ('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const http = require('http');
const db = knex ({
  client: 'pg',
	  connectionString: process.env.DATABASE_URL,
	  ssl: {
	    rejectUnauthorized: false
	  }
});

app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res)=>{
	res.send('app is working right now');
})
// =============== sign in ================
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
// ================ register ===============
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
//============= id get ==============
app.get('/profile/:id',(req,res)=> {profile.handleProfile(req,res,db)})
app.put('/image',(req,res)=> {image.handleImage(req,res,db)})
// // ========== listen ===============

app.listen( process.env.PORT || 3000 ,()=>{
	console.log(`app is running on port 3000`);
})
