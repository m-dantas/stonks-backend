const dbConfig = require('../db.config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: process.env.DB_HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
)

const db = {}

db.itensPedido = require('./itens-pedidos.model.js')(sequelize, Sequelize)
db.authtokens = require('./authtokens.model.js')(sequelize, Sequelize)
db.pedidos = require('./pedidos.model.js')(sequelize, Sequelize)
db.usuarios = require('./usuarios.model.js')(sequelize, Sequelize)
db.produtos = require('./produtos.model.js')(sequelize, Sequelize, db.usuarios)

db.usuarios.associate(db.authtokens)
db.authtokens.associate(db.usuarios)

module.exports = db
