require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in your environment variables.");
}
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 5500;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
      await client.close();
  }
}
// run().catch(console.dir);

async function cxnDB() {
  try {
      await client.connect();
      const collection = client.db("papa-lab-db").collection("papa-collection");
      const result = await collection.find().toArray();
      console.log("cxnDB result: ", result);
      return result;
  } catch (e) {
      console.log(e);
  } finally {
      await client.close();
  }
}


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

app.get('/', async (req, res) => {
  let result = await cxnDB().catch(console.error);

  if (result && result[0] && result[0].name) {
      res.send("testing: " + result[0].name);
  } else {
      res.send("No data found");
  }
});

app.post('/postClientData', (req, res) => {
  console.log("body: ", req.body);
  console.log("user Name: ", req.body.userName);
  res.render('index', {
      'myVariableClient': req.body.userName
  });
});


// app.listen(3000)

app.listen(port, () => console.log(`Server is running...on ${ port }` ));