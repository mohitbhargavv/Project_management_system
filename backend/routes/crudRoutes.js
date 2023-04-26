const express = require('express');
const router = express.Router();
const mongodb = require('mongodb')
const cookies= require('cookie-parser')
const cors = require('cors');
const { docfetch,docCreate,docDelete,itemUpdate, fetchItems, addItem } = require('../controller/crudController');
const app = express()
app.use(cors())
app.use(express.json())
const {routesCheck}=require('../controller/middleware')

app.use(cookies());
router.get('/',routesCheck, docfetch);



router.put('/',routesCheck, itemUpdate);


router.post('/',routesCheck, docCreate);

router.delete('/',routesCheck, docDelete);

router.post('/task',routesCheck,fetchItems);

router.put('/item',routesCheck,addItem)

module.exports = router;