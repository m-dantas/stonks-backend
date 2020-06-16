const db = require('../models')
const Produtos = db.produtos
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

  dao.findOrCreate(req, res, Produtos, where)
}

exports.findAll = (req, res) => dao.findAll(req, res, Produtos, 'Produtos')
exports.findOne = (req, res) => dao.findOne(req, res, Produtos)
exports.update = (req, res) => dao.update(req, res, Produtos)
exports.delete = (req, res) => dao.delete(req, res, Produtos)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, Produtos)
