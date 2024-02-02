//requires
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 3000;

//middlewares 
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    if (decoded) {
      next();
    }
  })
}

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
    //--------------JWT-----------------------//
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .send({ status: 200, success: true });
    })

    app.post('/clearCookies', async (req, res) => {
      const user = req.body;
      res.clearCookie('token', { maxAge: 0 }).send({ success: true });
    })



    //-------------DB handle functions------------------//
    const fruitsCollection = client.db('FreshFruit').collection('fruits');
    const fruitsCart = client.db('FreshFruit').collection('userCart');
    const admins = client.db('FreshFruit').collection('adminAccess');

    //get all fruits
    app.get('/fruits', async (req, res) => {
      const cursor = fruitsCollection.find();
      const result = await cursor.toArray();
      res.send(result);

    })
    //get fruits for HomePage sample
    app.get('/fruitsSample', async (req, res) => {
      const cursor = fruitsCollection.find().limit(8);
      const result = await cursor.toArray();
      res.send(result);
    })
    //get fruits by search keyword
    app.get('/fruitSearch', async (req, res) => {
      let query = {};
      if (req.query?.tags) {
        query = { tags: req.query.tags };
        const result = await fruitsCollection.find(query).toArray();
        return res.send(result);
      }

    })
    //Post product to the cart
    app.post('/cart', async (req, res) => {
      const cartItem = req.body;
      const result = await fruitsCart.insertOne(cartItem);
      res.send(result);
    })
    //Get user based cart products
    app.get('/cart', verifyToken, async (req, res) => {
      let query = {};
      console.log(req.query.email);
      if (req.query?.email) {
        query = { email: req.query.email};
      }
      const result = await fruitsCart.find(query).toArray();
      res.send(result);
    })
    //check if admin or not
    app.get('/adminAccess',async(req,res)=>{
       let query = {};
      query ={email: req.query?.email};
       const result = await admins.find(query).toArray();
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