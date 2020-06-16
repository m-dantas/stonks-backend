module.exports = (itemProduto, base) => {
  const itensProdutos = require('../controllers/itens-pedidos.controller.js')
  const router = require('express').Router()
  router.post('/', itensProdutos.create)
  router.get('/', itensProdutos.findAll)
  router.get('/:id', itensProdutos.findOne)
  router.put('/:id', itensProdutos.update)
  router.delete('/:id', itensProdutos.delete)
  itemProduto.use(`${base}/itens-pedidos`, router)
}

