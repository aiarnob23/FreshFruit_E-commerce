//requires
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const SSLCommerzPayment = require('sslcommerz-lts');
//sslCommerce payment
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false //true for live, false for sandbox

const port = process.env.PORT || 3000;

//middlewares 
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['https://freshfruit-c323e.web.app'],
  credentials: true,
}));


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
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      console.log(page, ' ', size);
      const cursor = fruitsCollection.find().skip((page - 1) * size).limit(size);
      const result = await cursor.toArray();
      return res.send(result);

    })

    //add a fruit to the DB
    app.post('/fruits', verifyToken, async (req, res) => {
      const newFruit = req.body;
      console.log(newFruit);
      const result = await fruitsCollection.insertOne(newFruit);
      res.send(result);
    })
    //get all products length
    app.get('/fruitsLength', async (req, res) => {
      const cursor = fruitsCollection.find();
      const result = await cursor.toArray();
      res.send({ length: result.length });
    })

    //get fruits for HomePage sample
    app.get('/fruitsSample', async (req, res) => {
      const cursor = fruitsCollection.find().limit(4);
      const result = await cursor.toArray();
      res.send(result);
    })
    //get fruits by search keyword like tags or id
    app.get('/fruitSearch', async (req, res) => {
      let query = {};
      if (req.query?.tags) {
        query = { tags: req.query.tags };
        const result = await fruitsCollection.find(query).toArray();
        return res.send(result);
      }
      if (req.query.id) {
        query = { _id: new ObjectId(req.query.id) };
        const result = await fruitsCollection.findOne(query);
        return res.send(result);
      }

    })
    //update a product
    app.put('/fruits/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedProduct = req.body;

      const product = {
        $set: {
          name: updatedProduct.name,
          image: updatedProduct.image,
          quantity: updatedProduct.quantity,
          price: updatedProduct.price,
        }
      }
      const result = await fruitsCollection.updateOne(filter, product, options);
      res.send(result);
    })
    //delete a product 
    app.delete('/fruits/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await fruitsCollection.deleteOne(query);
      res.send(result);
    })
    //delete a product from user cart
    app.delete('/cart/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await fruitsCart.deleteOne(query);
      res.send(result);
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
        query = { email: req.query.email };
      }
      const result = await fruitsCart.find(query).toArray();
      res.send(result);
    })
    //check if admin or not
    app.get('/adminAccess', async (req, res) => {
      let query = {};
      query = { email: req.query?.email };
      console.log(query);
      const result = await admins.find(query).toArray();
      const isAdmin = await result[0]?.role == 'admin';
      if (isAdmin) {
        console.log(result);
        console.log(isAdmin);
        return res.send(result);
      }
      else {
        return res.status(403).send({ message: 'Forbidden Access' });
      }
    })


    app.post('/paymentSuccess', (req, res) => {
      console.log(req);
      res.redirect('https://freshfruit-c323e.web.app/products');
    })
    app.post('/paymentFailed', (req, res) => {
      res.redirect('https://freshfruit-c323e.web.app/cart');
    })


    //sslcommerz init
    app.post('/init', verifyToken, (req, res) => {
      const trans_id = new ObjectId().toString();
      console.log(req.body);
      const data = {
        total_amount: req.body.price,
        currency: 'BDT',
        tran_id: trans_id,
        success_url: 'https://server-sand-eta.vercel.app/paymentSuccess',
        fail_url: 'https://server-sand-eta.vercel.app/paymentFailed',
        cancel_url: 'https://server-sand-eta.vercel.app/paymentFailed',
        ipn_url: 'https://server-sand-eta.vercel.app/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
      };
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
      sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.send({ url: GatewayPageURL });
        console.log('Redirecting to: ', GatewayPageURL)
      });
    })



  } finally {
  }
}
run().catch(console.dir);



//initializing app.listen
app.listen(port, () => {
  console.log(`E-Commerce server is running on port ${process.env.PORT}`);
})