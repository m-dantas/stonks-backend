const db = require('../models')
const Pedidos = db.pedidos
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

  dao.findOrCreate(req, res, Pedidos, where)
}

exports.findAll = (req, res) => dao.findAll(req, res, Pedidos, 'ItensPedido')
exports.findOne = (req, res) => dao.findOne(req, res, Pedidos)
exports.update = (req, res) => dao.update(req, res, Pedidos)
exports.delete = (req, res) => dao.delete(req, res, Pedidos)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, Pedidos)
