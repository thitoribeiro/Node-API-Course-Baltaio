'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//DB connection
mongoose.connect('mongodb+srv://thito:senha123@mongostudy.0tawc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

//Models load
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Routes loading
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false 
}));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;