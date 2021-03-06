import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import middlewares from './middlewares'

const app = express()
const { name, version, description } = require('../package.json')

const basePath = `/${name}/${version}`
const endpoints = [
  'usuarios',
  'produtos',
  'pedidos',
  'itens-pedidos'
]

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(middlewares)

// create endpoints
endpoints.forEach(endpoint => {
  require(`./routes/${endpoint}.routes`)(app, basePath)
})

const PORT = process.env.PORT || 5000

app.get(`${basePath}`, (req, res) => {
  const baseEndpoint = `${req.protocol}://${req.hostname}:${PORT}${basePath}`
  res.json({
    name,
    description,
    version,
    baseEndpoint,
    endpoints: endpoints.map(endpoint => `/${endpoint}`),
  })
})

app.listen(PORT, () => {
  console.log(`Servidor diponível na porta ${PORT}.`)
})
