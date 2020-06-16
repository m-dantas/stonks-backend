module.exports = (produto, base) => {
  const produtos = require('../controllers/produtos.controller.js')
  const router = require('express').Router()
  router.post('/', produtos.create)
  router.get('/', produtos.findAll)
  router.get('/:id', produtos.findOne)
  router.put('/:id', produtos.update)
  router.delete('/:id', produtos.delete)
  produto.use(`${base}/produtos`, router)
}

