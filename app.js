const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = (process.env.PORT || 3000)

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

let myVariableServer = 'soft coded server data'

app.get('/views', function (req, res) {
  res.render('index', 
  {
    'myVariableClient' : myVariableServer 
  }
  );
})

app.post('/postClientData', function (req, res) {
  
  console.log("body: ", req.body)
  console.log("user Name: ", req.body.userName)
 //  console.log("params: ", req.params['userName']);
 
 // myVariableServer = req.body.userName;

 res.render('index', 
 {
   'myVariableClient' : req.body.userName 
 }
 );
})

app.get('/', function (req, res) {
  res.send('<h1>Hello World From Express & a PaaS/Render</h1>')
})

app.get('/whatever', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})



// app.listen(3000)

app.listen(port, () => console.log(`Server is running...on ${ port }` ));