module.exports = (sequelize, Sequelize, produtos) => {
  const Pedidos = sequelize.define('pedidos', {
    produto: {
      type: Sequelize.INTEGER,
      references: {
        model: produtos,
        key: 'id'
      }
    },
    total: {
      type: Sequelize.INTEGER
    }
  })
  return Pedidos
}
