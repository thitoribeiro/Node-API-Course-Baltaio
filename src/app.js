'use strict';

const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const router = express.Router();

//Carrega as Rotas
const index = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const create = router.post('/', (req, res, next) => {
    res.status(201).send(req.body);
});

const put = router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({ 
        id: id, 
        item: req.body 
    });
});

const del = router.delete('/', (req, res, next) => {
    res.status(200).send("Sucessful deleted!");
});

app.use('/', index);
app.use('/products', create);
app.use('/products', put);
app.use('/products', del);

module.exports = app;