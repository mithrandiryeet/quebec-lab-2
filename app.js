const express = require('express')
const app = express()
const port = (process.env.PORT || 3000)

app.set('view engine', 'ejs');

let myVariableServer = 'soft coded server data'

app.get('/views', function (req, res) {
  res.render('index', 
  {
    'myVariableClient' : myVariableServer
  });
})

app.get('/', function (req, res) {
  res.send('<h1>Hello World From Express & a Paas/Render (and Will)</h1>')
})

app.get('/index', function (req, res) {        // '/index' can be called anything
  res.sendFile(__dirname + '/index.html');
})

app.post('/postClientData', function (req, res) {


  console.log("body: ", req.body)
  console.log("parmas: ", req.params['userName']);

  myVariableServer = 'now we\'ve posted'

  res.render('index', 
  {
    'myVariableClient' : myVariableServer
  });
})

// app.listen(3000)

app.listen(port, () => console.log(`Server is running on... ${ port }`));