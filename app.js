const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('<h1>Hello World From Express & a Paas/Render (and Will)</h1>')
})

app.listen(3000)