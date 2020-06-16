module.exports = (pedido, base) => {
  const pedidos = require('../controllers/pedidos.controller.js')
  const router = require('express').Router()
  router.post('/', pedidos.create)
  router.get('/', pedidos.findAll)
  router.get('/:id', pedidos.findOne)
  router.put('/:id', pedidos.update)
  router.delete('/:id', pedidos.delete)
  pedido.use(`${base}/pedidos`, router)
}

