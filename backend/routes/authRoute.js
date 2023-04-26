const express = require('express');
const router = express.Router();
const mongodb = require('mongodb')
const todo = require('../model/todoSchema')
const cors = require('cors')
const app = express()
const auth=require('../controller/authController.js')
// const login=require('./controller/authController')

app.use(cors())
app.use(express.json())



router.post('/signup', auth.signup);



router.post('/login', auth.login);




module.exports = router;