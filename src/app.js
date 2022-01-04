'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//DB connection
mongoose.connect('mongodb+srv://thito:senha123@mongostudy.0tawc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

//Routes loading
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false 
}));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;