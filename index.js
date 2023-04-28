const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  CURSOR_FLAGS,
} = require("mongodb");

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
const uri = `mongodb+srv://austcdc:cp0pTbIDGlfEIfSr@cluster0.shojg7d.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    console.log("DB connected");
    const userCollection = client.db("austcdc").collection("users");
    const ExecutiveCollection = client
      .db("austcdc")
      .collection("ExecutiveMemberList");
    const SubExecutiveCollection = client
      .db("austcdc")
      .collection("SubExecutiveMemberList");
    const emailCollection = client.db("austcdc").collection("emails");
    const panelStatusCollection = client.db("austcdc").collection("panelStatus");
    const eventCollection = client.db("austcdc").collection("newEvent");
const homePageSliderCollection = client.db("austcdc").collection("homePageSliderImages")

const newsCollection = client.db("austcdc").collection("latestNews");
const latestEventCollection = client.db("austcdc").collection("latestEvent");
    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const products = await cursor.toArray();
      const result = products.reverse();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    app.post("/userEmail", async (req, res) => {
      const email = req.body;
      const result = await emailCollection.insertOne(email);
      res.send(result);
    });
    app.get("/userEmail", async (req, res) => {
      const query = {};
      const cursor = emailCollection.find(query);
      const emails = await cursor.toArray();
      const result = emails.reverse();
      res.send(result);
    });
    app.get("/executive", async (req, res) => {
      const query = {};
      const cursor = ExecutiveCollection.find(query);
      const executiveMember = await cursor.toArray();
      console.log(executiveMember);
      res.send(executiveMember);
    });
    app.get("/SubExecutive", async (req, res) => {
      const query = {};
      const cursor = SubExecutiveCollection.find(query);
      const SubExecutiveMember = await cursor.toArray();
      res.send(SubExecutiveMember);
    });

    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const doc = {
        $set: {
          status: "active",
        },
      };
      const result = await userCollection.updateOne(filter, doc);
      res.send(result);
    });
    app.get("/panelStatus", async (req, res) => {
      const result = await panelStatusCollection.findOne({});
      res.send(result);
    });
    app.get("/homePageSlider",async(req,res)=>{
      const query = {};
      const cursor = homePageSliderCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get("/recentEvent",async(req,res)=>{
      const result = await eventCollection.findOne({});
      res.send(result);
    })
     app.put("/recentEvent/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      console.log(data)
      const filter = { _id: ObjectId(id) };
      const doc = {
        $set: { ...data },
      };
      const result = await eventCollection.updateOne(filter, doc);
      res.send(result);
    }); 
    app.get("/latestNews",async(req,res)=>{
      const query = {};
      const cursor = newsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get("/latestEvent",async(req,res)=>{
      const query ={};
      const cursor = latestEventCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Aust Cdc");
});

app.listen(port, () => {
  console.log("Aust Cdc", port);
});

/* 
*/
