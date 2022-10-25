
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

const logger = require('./middlewares/logger')
const sessions = require('./middlewares/sessions')

app.listen(4567, function () {
  console.log('Server is listening on port 4567')
})
app.use(logger)