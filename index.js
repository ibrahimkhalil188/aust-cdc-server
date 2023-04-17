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
        const SubExecutiveCollection = client.db("austcdc").collection("SubExecutiveMemberList");
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
            console.log(executiveMember);
            res.send(executiveMember);
        })
        app.get("/SubExecutive",async(req,res)=>{
            const query = {};
            const cursor = SubExecutiveCollection.find(query);
            const SubExecutiveMember = await cursor.toArray();
            console.log(SubExecutiveMember);
            res.send(SubExecutiveMember);
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


/* 
[
  
  {
    _id: new ObjectId("63df0c6aa67a1541daed0b4f"),
    id: 1,
    img: 'https://i.ibb.co/Wc7N7VN/S21-E-1.png ',
    name: 'SYED SHAHEERUDDIN AHMED',
    title: 'PRESIDENT'
  },
  
   {
    _id: new ObjectId("63df0c6aa67a1541daed0b50"),
    id: 2,
    img: ' https://i.ibb.co/hyG3D8s/S21-E-2.png',
    name: 'FAISAL FARHAN',
    title: 'TREASURER'
  },
  {
    _id: new ObjectId("63df0c6aa67a1541daed0b51"),
    id: 3,
    img: 'https://i.ibb.co/0jqphJs/S21-E-3.png ',
    name: 'SYED JUNAYED AHMED NILOY',
    title: 'VICE-PRESIDENT',
    facebookUrl: 'https://www.facebook.com/syed.niloy.1/',       
    instaUrl: 'https://www.linkedin.com/in/syed-junayed-ahmed-niloy-058551198/',
    mailUrl: 'https://mail.google.com/mail/?view=cm&source=mailto&to=syedniloy1996@gmail.com'
  },
  {
    _id: new ObjectId("63df0c6aa67a1541daed0b52"),
    id: 4,
    img: 'https://i.ibb.co/jzzMHnV/S21-E-4.png ',
    name: 'Fahmida Akter Jotey ',
    title: 'General Secretary',
    facebookUrl: 'https://www.facebook.com/profile.php?id=100010310259728',
    instaUrl: 'https://www.linkedin.com/in/fahmida-jotey-026914171/',
    mailUrl: 'https://mail.google.com/mail/?view=cm&source=mailto&to=fahmidajotey321@gmail.com'
  },
 
  {
    _id: new ObjectId("63df0c6aa67a1541daed0b53"),
    id: 5,
    img: 'https://i.ibb.co/sCbGQ2D/S21-E-5.png ',
    name: 'Towsif Mehedi Dhrubo',
    title: 'Joint Secretary',
    facebookUrl: 'https://www.facebook.com/towsifmehedi.dhrubo/',    instaUrl: 'https://www.linkedin.com/in/towsif-mehedi-dhrubo-04aa68194/',
    mailUrl: 'https://mail.google.com/mail/?view=cm&source=mailto&to=dhrubo578@gmail.com'
  },
  {
    _id: new ObjectId("63df0c6aa67a1541daed0b54"),
    id: 6,
    img: 'https://i.ibb.co/2vCY35K/S21-E-6.png ',
    name: 'Upal Barua',
    title: 'Joint Secretary',
    facebookUrl: 'https://www.facebook.com/barua.upal/',
    instaUrl: 'https://www.linkedin.com/in/upal-barua/',
    mailUrl: 'https://mail.google.com/mail/?view=cm&source=mailto&to=upalwork@gmail.com'
  },
  
  {
    _id: new ObjectId("63df0c6aa67a1541daed0b55"),
    id: 7,
    img: 'https://i.ibb.co/qj6K02M/S21-E-7.png ',
    name: 'Nahian Jannat Anika',
    title: 'Executive Body',
    facebookUrl: 'https://www.facebook.com/jannat.anika.9256',   
    instaUrl: 'https://www.linkedin.com/in/nahian-jannat-anika-98402b208',
    mailUrl: 'https://mail.google.com/mail/?view=cm&source=mailto&to=jannatanika57@gmail.com'
  },
  {
    _id: new ObjectId("63df0c6aa67a1541daed0b56"),
    id: 8,
    img: 'https://i.ibb.co/SnBfq45/S21-E-8.png',
    name: 'Wahidul Alam Nahid',
    title: 'Executive Body',
    facebookUrl: 'https://www.facebook.com/wahid222',
    instaUrl: 'https://www.linkedin.com/in/wahidnahid/',
    mailUrl: 'https://mail.google.com/mail/?view=cm&source=mailto&to=wahidulalam.nahid@gmail.com'
  },
   {
    _id: new ObjectId("63df0c6aa67a1541daed0b57"),
    id: 9,
    img: ' https://i.ibb.co/Nx2k9f3/S21-E-10.png ',
    name: 'Tasviul Ibn Kamal',
    title: 'Executive Body',
    facebookUrl: 'https://www.facebook.com/tasviul?mibextid=ZbWKwL',
    instaUrl: 'https://www.linkedin.com/in/tasviul-saad-5574b61a7',
    mailUrl: 'https://mail.google.com/mail/?view=cm&source=mailto&to=tasviul@gmail.com'
  },
  {
    _id: new ObjectId("63df0c6aa67a1541daed0b58"),
    id: 10,
    img: 'https://i.ibb.co/7rW27yB/S21-E-9.png ',
    name: 'Amartya Biswas',
    title: 'Executive Body',
    facebookUrl: 'https://www.facebook.com/amartya.biswas.771/', 
    instaUrl: 'https://www.linkedin.com/in/amartyabiswas642/',   
    mailUrl: 'https://mail.google.com/mail/?view=cm&source=mailto&to=amartyabiswas642@gmail.com'
  },
]

*/