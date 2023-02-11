const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
require("dotenv").config()
const { MongoClient, ServerApiVersion, ObjectId, CURSOR_FLAGS } = require('mongodb');

app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(express.json())
const uri = `mongodb+srv://austcdc:cp0pTbIDGlfEIfSr@cluster0.shojg7d.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        console.log("DB connected");
        const userCollection = client.db("austcdc").collection("users");
        const ExecutiveCollection = client.db("austcdc").collection("ExecutiveMemberList");
        const emailCollection = client.db("austcdc").collection("emails")


        app.get("/users", async (req, res) => {
            const query = {}
            const cursor = userCollection.find(query)
            const products = await cursor.toArray()
            const result = products.reverse()
            res.send(result)
        })

        app.post("/users", async (req, res) => {
            const user = req.body
            const result = await userCollection.insertOne(user)
            res.send(result)
        })
        app.post("/userEmail",async(req,res)=>{
            const email = req.body;
            const result = await emailCollection.insertOne(email);
            res.send(result);
        })
        app.get("/userEmail",async(req,res)=>{
            const query = {}
            const cursor = emailCollection.find(query)
            const emails = await cursor.toArray()
            const result = emails.reverse()
            res.send(result)
        })
        app.get("/executive",async(req,res)=>{
            const query = {};
            const cursor = ExecutiveCollection.find(query)
            const executiveMember = await cursor.toArray();
            res.send(executiveMember);
        })

        app.put("/users/:id", async (req, res) => {
            const id = req.params.id
            console.log(id)
            const filter = { _id: ObjectId(id) }
            const doc = {
                $set: {
                    status: "active"
                }
            }
            const result = await userCollection.updateOne(filter, doc)
            res.send(result)

        })
    }
    finally {

    }
}
run().catch(console.dir)
app.get("/", (req, res) => {
    res.send("Aust Cdc")
})

app.listen(port, () => {
    console.log("Aust Cdc", port)
})