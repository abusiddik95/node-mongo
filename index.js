const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const app = express();

app.use(cors());
app.use(bodyParser.json());


const uri = process.env.DB_PATH

let client = new MongoClient(uri, { useNewUrlParser: true });
const users = ["Asad", "Jamal" ,"Kamal", "Khalil", "Rahim"]

const data = {
    name:'Asad',
    job: 'web dev',
    salary: 700000,
    company:{
        name: 'ABC Company',
        website: 'ABC.com',
        email: 'abc@mail.com'
    }
}

app.get('/products', (req, res) =>{
    
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }else{
                res.send(documents);
            }
        })
        client.close();
      });
});

app.get('/fruits/banana', (req, res)=>{
    res.send({
        fruit: 'banana',
        quantity:1000,
        price: 1000

    });
})

app.get('/users/:id', (req, res) =>{
    const id = req.params.id;
    const name = users[id];
    res.send({id,name})
    console.log(req.query)
    console.log(req.params.id);
})


//post 
app.post('/addProduct', (req, res)=>{
    //save to database
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }else{
                res.send(result.ops[0]);
            }
        })
        client.close();
      });
})

const port = process.env.PORT || 4200;
app.listen(port, () => console.log('listening to port 4200'));