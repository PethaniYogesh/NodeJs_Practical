// 

const express = require("express");
const app = express();
const mongodb = require("mongodb");
const bodyparser = require("body-parser");
const MongoClient = mongodb.MongoClient;

const PORT = 3002;
const dbName = "TestNodeJS";
const dbLink = `mongodb://localhost:27017/${dbName}`;

app.use(bodyparser.json());
app.use("/", require("./routes"));
const server = app.listen(PORT, () => {
    console.log(`We are live on ${PORT}`);
})

MongoClient.connect(dbLink, { useUnifiedTopology: true, useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log("DB connection error: ", err);
    }

    db = module.exports = client.db(dbName);
    console.log("BD connect successfuly");
})