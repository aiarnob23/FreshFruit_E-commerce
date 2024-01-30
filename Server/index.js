//requires
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000;

//middlewares
const app = express();
app.use(cors());
app.use(express.json());

//initializing app.get
app.get('/', (req, res) => {
  res.send('E-Commerce Server');
})


//mongodb connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://aiarnob23:${process.env.MONGO_PASS}@cluster0.vvmqsfs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//functions for handle DB
async function run() {
  try {
    const fruitsCollection = client.db('FreshFruit').collection('fruits');

    //get all fruits
    app.get('/fruits', async (req, res) => {
      const cursor = fruitsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
        
    })
    //get fruits for HomePage sample
    app.get('/fruitsSample', async (req, res) => {
      const cursor = fruitsCollection.find().limit(5);
      const result = await cursor.toArray();
      res.send(result);
    })


  } finally {
  }
}
run().catch(console.dir);



//initializing app.listen
app.listen(port, () => {
  console.log(`E-Commerce server is running on port ${process.env.PORT}`);
})