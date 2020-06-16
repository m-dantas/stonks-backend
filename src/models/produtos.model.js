module.exports = (sequelize, Sequelize, usuarios) => {
  const Produtos = sequelize.define('produtos', {
    nome: {
      type: Sequelize.STRING(128)
    },
    src: {
      type: Sequelize.BLOB
    },
    preco: {
      type: Sequelize.INTEGER
    },
    quantidade: {
      type: Sequelize.INTEGER
    },
    descricao: {
      type: Sequelize.STRING
    },
    usuario: {
      type: Sequelize.INTEGER,
      references: {
        model: usuarios,
        key: 'id'
      }
    }
  })
  return Produtos
}
