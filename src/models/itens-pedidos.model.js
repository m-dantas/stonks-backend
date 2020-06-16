module.exports = (sequelize, Sequelize, pedidos) => {
  const ItensPedidos = sequelize.define('itens-pedidos', {
    quantidade: {
      type: Sequelize.INTEGER
    },
    subtotal: {
      type: Sequelize.INTEGER
    },
    pedido: {
      type: Sequelize.INTEGER,
      references: {
        model: pedidos,
        key: 'id'
      }
    }
  })
  return ItensPedidos
}
