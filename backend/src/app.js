const express = require('express')
const cors = require('cors')

const app = express()
app.disable('x-powered-by') // ne pas annoncer la technologie du serveur

// CORS strict : seule l'origine du frontend est autorisée (jamais « * »).
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

// Contrat OpenAPI : GET /api/v1/health -> 200 { "status": "ok" }
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

module.exports = app
