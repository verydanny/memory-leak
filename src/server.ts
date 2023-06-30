import express from 'express'
import { renderApp } from './server/middleware/render.js'

const port = 3000
const app = express()

app.get('*', renderApp)

app.listen(port, () =>
  console.log(`Server starter on http://localhost:${port}`)
)
