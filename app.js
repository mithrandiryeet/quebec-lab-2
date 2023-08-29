const express = require('express')
const app = express()
const port = (process.env.PORT || 3000)

app.get('/', function (req, res) {
  res.send('<h1>Hello World From Express & a Paas/Render (and Will)</h1>')
})

app.get('/index', function (req, res) {
  res.sendFile(__dirname + 'index.html');
})


// app.listen(3000)

app.listen(port, () => console.log(`Server is running on...on ${ port }`));