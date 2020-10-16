//Express
const express = require('express');
const app = express()
//Port 
const port = 5000
//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json())
//cors
const cors = require('cors');
app.use(cors());
//Env Config
require('dotenv').config()
//Root
app.get('/', function (req, res) {
    res.send('hello world')
})

//MongoDb
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.7p7ud.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {

    //Service
    const serviceCollection = client.db("creativeAgency").collection("addService");
    app.post('/addService', (req, res) => {
        const service = req.body;
        serviceCollection.insertOne(service)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })

    app.get('/allServices', (req, res) => {
        serviceCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    //Review
    const reviewCollection = client.db("creativeAgency").collection("customerReviews");
    app.post('/customerReviews', (req, res) => {
        const reviews = req.body;
        reviewCollection.insertOne(reviews)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })

    app.get('/customerReviews', (req, res) => {
        reviewCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    //Cutomer Order
    const orderCollection = client.db("creativeAgency").collection("customerOrder");
    app.post('/customerOrder', (req, res) => {
        const order = req.body;
        orderCollection.insertOne(order)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })

    //Services
    app.get('/customerOrder', (req, res) => {
        orderCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
});


//Listen Port
app.listen(process.env.PORT || port)