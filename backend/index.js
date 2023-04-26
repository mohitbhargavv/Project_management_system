const express = require('express')
const app = express();
const mongodb = require('mongodb');
const cookies= require('cookie-parser')

const dbConnect = require('./model/database');
const todo =require('./model/todoSchema')

const routes=require('./routes/crudRoutes')
const authRoutes=require('./routes/authRoute')

app.use(cookies());
const cors = require('cors');
app.use(cors({origin:true,credentials:true}))

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/user',routes)



app.use('/auth',authRoutes)


app.listen(3001,()=>console.log(`server is live on http://localhost:3001`))

