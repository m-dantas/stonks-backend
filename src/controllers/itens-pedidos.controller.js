const db = require('../models')
const ItensPedido = db.itensPedido
const dao = require('./dao')

exports.create = async (req, res) => {
  if (!req.body.nome) {
    res.status(400).send({
      message: 'Inclua um nome na requisição'
    })
    return
  }
  
  const where = {
    nome: req.body.nome
  }

  dao.findOrCreate(req, res, ItensPedido, where)
}

exports.findAll = (req, res) => dao.findAll(req, res, ItensPedido, 'ItensPedido')
exports.findOne = (req, res) => dao.findOne(req, res, ItensPedido)
exports.update = (req, res) => dao.update(req, res, ItensPedido)
exports.delete = (req, res) => dao.delete(req, res, ItensPedido)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, ItensPedido)
