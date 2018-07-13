//requiring in necessary packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

//setting up the server
const app = express();
const PORT = process.env.PORT || 3001;

  
//connect and target a mongo db - the MONGODB_URI env variable is coming from Heroku where it's set under config
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/plan-room");

//import schemas
//how to import multiple models
//const db = require("./models");
const SubcontractorProfile = require("./models/subcontractor");

//middleware to parse json objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//serve files out of the client/build folder of the react app
app.use(express.static("client/build"));


 

//routes

app.get("/", (req,res)=> {
    res.send("hi");
});

app.get("/api/test", (req,res)=> {
    res.json(true);
});
 
app.post("/api/test", (req, res)=> {
    console.log(req.body);
    SubcontractorProfile.create(req.body).then(dbSubProfile => {
        res.json(dbSubProfile);
    })
});

//if no other route is matched
app.use(function(req,res){
    res.sendFile(path.join(__dirname, "client/build/index.html"));
})


//adding the mongoose schemas here
 


//starting up the server
app.listen(PORT, function(){
    console.log(`API Server now listening on port ${PORT}`);
  });
