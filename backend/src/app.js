const express = require('express')
const cors = require('cors')

const app = express()
app.disable('x-powered-by') // ne pas annoncer la technologie du serveur
const productsrouter = require('./routes/products')


// CORS strict : seule l'origine du frontend est autorisée (jamais « * »).
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())
app.use('/api/v1/products', productsrouter)

// Contrat OpenAPI : GET /api/v1/health -> 200 { "status": "ok" }
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

module.exports = app
