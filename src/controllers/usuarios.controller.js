const db = require('../models')
const Usuario = db.usuarios

const dao = require('./dao')
const { hashSync } = require('bcrypt')

const sgMail = require('@sendgrid/mail')
const templatesHTML = require('../services')

const exceptionsDefault = error => {
  return {
    message: error.message || 'Erro na requisição',
    error
  }
}

function generater () {
  let numbers = []
  for (let i=1; i<5; i++) {
    const numberRandom = Math.floor(Math.random() * 9 + 1)
    numbers.push(numberRandom)
  }
  return numbers
          .toString()
          .replace(/,/g,'')
}

const sendEmail = async (email, nome, code) => {
  const html = templatesHTML.codeVerification(nome, code).replace(/\n/g,'')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: 'stonksappcp@gmail.com',
    subject: 'Código de verificação',
    text: 'foi meu amado',
    html: html,
  };
  sgMail.send(msg)
}

exports.create = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res
      .status(400)
      .send(
        exceptionsDefault('Ausência de email ou password na body da requisição')
      )
  }

  const hash = hashSync(req.body.password, 10)

  try {
    const codeVerify = generater(req.body.email)
    const body = {
      ...req.body,
      codeVerify,
      isVerify: false
    }
    let user = await Usuario.create(Object.assign(body, { password: hash }))
    let message = 'Usuário criado com sucesso, verifique seu e-mail e insira o código de verifição'

    sendEmail(req.body.email, req.body.nome, codeVerify)
    
    return res.status(200).send({ 
      message,
      user
    })
  } catch (err) {
    let msg = ''
    if (err.errors[0].message === 'email must be unique') {
      msg = 'E-mail já registrado.'
    } else if (err.errors[0].message === 'cnpj must be unique') {
      msg = 'CNPJ já registrado.'
    } else {
      msg = 'Ocorreu um erro no registro, tente mais tarde.'
    }
    return res.status(404).send({
      msg
    })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res
      .status(400)
      .send(
        exceptionsDefault('Ausência de email ou password na body da requisição')
      )
  }

  try {
    let user = await Usuario.authenticate(email, password)
    return res.json(user)
  } catch (err) {
    return res.status(400).send(exceptionsDefault(err))
  }
}

exports.logout = async (req, res) => {
  const token = req.headers['authorization']

  try {
    if (!req.authorized) {
      return res
        .status(403)
        .send(exceptionsDefault('Erro no token de autenticação'))
    }

    let user = await Usuario.logout(token)
    return res.status(204).send({ user })
  } catch (err) {
    return res.status(400).send(exceptionsDefault(err))
  }
}

exports.code = async (req, res) => {
  const { codeVerify } = req.body

  try {
    let user = await Usuario.findOne({ 
      where: { codeVerify }
    })

    if (user) {
      const body = { isVerify: true }
      const id = user.id
      user = await Usuario.update(body, { where: { id }})

      return res.send({
        message: 'Usuário verificado, efetue seu login agora.'
      })
    }
  } catch (err) {
    return res.status(400).send({
      message: 'Erro, digite o código novamente!',
      err
    })
  }
}

exports.findAll = (req, res) => {
  if (!req.authorized) {
    res.status(403).send(exceptionsDefault('Operação não autorizada'))
  }
  return Usuario.findAll()
    .then(usuarios => {
      const usuariosSemDadosSensiveis = usuarios.map(usuario => {
        return {
          id: usuario.id,
          nprodam: usuario.nprodam,
          nome: usuario.nome
        }
      })
      res.send({
        message: 'Usuários cadastrados',
        data: usuariosSemDadosSensiveis
      })
    })
    .catch(err => {
      res
        .status(500)
        .send(exceptionsDefault('Ocorreu um erro ao encontrar usuários'))
    })
}

exports.findOne = (req, res) => {
  if (!req.authorized) {
    res.status(403).send(exceptionsDefault('Operação não autorizada'))
  }
  const iduser = req.params.id
  Usuario.findByPk(iduser)
    .then(user => {
      const { id, nprodam, nome } = user
      res.send({
        message: 'Usuário',
        id,
        nome
      })
    })
    .catch(err => {
      res
        .status(400)
        .send(exceptionsDefault('Ocorreu um erro ao encontrar usuário'))
    })
}

exports.update = (req, res) => {
  if (!req.authorized) {
    res.status(403).send(exceptionsDefault('Operação não autorizada'))
  } else if (req.body.password) {
    req.body.password = hashSync(req.body.password, 10)
    dao.update(req, res, Usuario)
  } else {
    dao.update(req, res, Usuario)
  }
}

exports.delete = (req, res) => {
  if (!req.authorized)
    res.status(403).send(exceptionsDefault('Operação não autorizada'))
  dao.delete(req, res, Usuario)
}

exports.deleteAll = (req, res) => {
  if (!req.authorized)
    res.status(403).send(exceptionsDefault('Operação não autorizada'))
  dao.deleteAll(req, res, Usuario)
}
