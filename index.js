const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv').config();
const cors = require("cors");

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h8ryi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    const productsCollection = client.db('outshade_db').collection('products');
    const categoryCollection = client.db('outshade_db').collection('categories');
    try {
        app.get('/products', async (req, res) => {
            const products = await productsCollection.find({}).toArray();
            res.send(products)
        })


        // get categories
        app.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoryCollection.find(query).toArray();
            res.send(categories)
        });


        app.post('/products', async (req, res) => {
            const doc = req.body;
            const result = await productsCollection.insertOne(doc);
            res.send(result)
        });

        // get selected items
        app.get('/products/:category', async (req, res) => {
            const category = req.params.category;
            const query = { category };
            const result = await productsCollection.find(query).toArray();
            res.send(result)
        })


    } finally {
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})