const { compareSync } = require('bcrypt')

module.exports = (sequelize, Sequelize) => {
  let Usuario = sequelize.define('usuarios', {
    nome: {
      type: Sequelize.STRING(256)
    },
    sobrenome: {
      type: Sequelize.STRING(256)
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    codeVerify: {
      type: Sequelize.INTEGER
    },
    isVerify: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    nomeEmpresa: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cnpj: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    }
  })

  Usuario.associate = AuthTokenModel => Usuario.hasMany(AuthTokenModel)

  Usuario.prototype.authorize = async function () {
    const { authtokens } = sequelize.models
    const user = this
    const auth = await authtokens.generate(this.id)

    return { usuario: user, auth }
  }

  Usuario.authenticate = async function (email, password) {
    const user = await this.findOne({ where: { email } })

    console.log(user)

    if (!user) {
      throw new Error('Usuário não encontrado, se ainda não não possui uma conta se registre agora.')
    }

    if (!user.isVerify) {
      throw new Error('Usuário não verificado, clique em verificar para inserir seu código de verificação.')
    } else if (compareSync(password, user.password)) {
      return user.authorize()
    } else {
      throw new Error('Senha inválida')
    }
  }

  Usuario.logout = async function (token) {
    const { authtokens } = sequelize.models
    try {
      await authtokens.destroy({ where: { token } })
    } catch (err) {
      return err
    }
  }

  return Usuario
}
