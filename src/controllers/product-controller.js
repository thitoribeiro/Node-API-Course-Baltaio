'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');
const azure = require('azure-storage');
const guid = require('quid');

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

exports.getBySlug = async(req, res, next) => {
    try {
    var data = await repository.getBySlug(req.params.slug)
            res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
    res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
    
}

exports.getByTag = async(req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag)
            res.status(200).send(data);
    } catch (error) {
        res.status(500).send ({
            message: 'Falaha ao processar sua requisição'
        });
    }
}

exports.post = async (req, res, next) => {
   try {

        //Create Blob Service
        const blobSvc = azure.createBlobService(config.userImagesBlobConnectionString);

        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new BufferEncoding(matches[2], 'base64');

        //Save image
        blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
           contentType: type
       }, function (error, result, response) {
           it(error); {
               filename = 'default-product.png';
           }
       });


        await repository.create(req.body);
        res.status(201).send({ 
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

   

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
            res.status(200).send({ 
                message: 'Produto atualizado com sucesso!'
            });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar su requisição'
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id)
            res.status(200).send({ 
                message: 'Produto removido com sucesso'
            });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};