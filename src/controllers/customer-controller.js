'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-services');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
   
}

exports.post = async (req, res, next) => {
    try {
        await repository.create({
            name: req.body.name,
            email:req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        emailService.send(
            req.body.email,
            'Bem vindo ao Node Orders',
            global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201).send({ 
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update( req.params.id, {
            name: req.body.name, 
            email: req.body.email, 
            password: md5(req.body.password + global.SALT_KEY)
        });
            res.status(200).send({ 
                message: 'Cliente atualizado com sucesso!'
            });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

        exports.delete = async(req, res, next) => {
            try {
                await repository.delete(req.body.id)
                    res.status(200).send({ 
                        message: 'Cliente removido com sucesso'
                    });
            } catch (error) {
                res.status(500).send({
                    message: 'Falha ao processar sua requisição'
                });
            }
        };
