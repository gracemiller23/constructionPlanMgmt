//requiring in necessary packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

if(!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE){
    throw "Make sure you have AUTH0_DOMAIN and AUTH0_AUDIENCE configured."
}

//jwt middleware
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwks = require("jwks-rsa");

//setting up the server
const app = express();
const PORT = process.env.PORT || 3001;

  
//connect and target a mongo db - the MONGODB_URI env variable is coming from Heroku where it's set under config
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/plan-room");

//import schemas
//how to import multiple models
const db = require("./models");
//const SubcontractorProfile = require("./models/subcontractor");

const corsOptions ={
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

//middleware to parse json objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//serve files out of the client/build folder of the react app
app.use(express.static("client/build"));

//setting up jwt middleware
const checkJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: process.env.AUTH0_DOMAIN + ".well-known/jwks.json"
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_DOMAIN,
    algorithms: ['RS256']
});

app.use(checkJwt);

//add additional scopes for other routes like: ['read:projects', 'write:projects']
const checkFirstUser = jwtAuthz(['openid']);
const checkSelfProfile = jwtAuthz(['profile']);
const checkReadProjects = jwtAuthz(['read:projects']);
const checkWriteProjects = jwtAuthz(['write:projects']);
const checkReadSubProfile = jwtAuthz(['read:subprofile']);
const checkPutSubProfile = jwtAuthz(['update:subprofile']);
const checkWriteSubInviteReply = jwtAuthz(['write:subinvitereply']);
const checkReadSubInviteReply = jwtAuthz(['read:subinvitereply']);

//---------------------------------routes-------------------------------------//


//route for creating a profile entry with an auth0 id after the user's very first login, which is immediately logged out

app.post("/api/firstprofile", checkJwt, checkFirstUser, (req, res)=>{
    db.SubcontractorProfile.create(req.body).then(dbSubProfile => {
        console.log(dbSubProfile)
        res.json(dbSubProfile);
    })
} )

//route for admin profile getting - must create in PostMan

app.get("/api/adminprofile/:id", checkJwt, checkWriteProjects, (req,res)=> {
    let userAuth0Id = req.params.id;
    db.AdminProfile.findOne({auth0Id: userAuth0Id}).then(results => {
        res.json(results)
    });
});

//route for admin accessing all subs

app.get("/api/subcontractors", checkJwt, checkWriteProjects, (req,res)=> {
    db.SubcontractorProfile.find({}).then(results => {
        res.json(results)
        }
    );
});

//routes for subcontractor profile elements stored in MongoDB
app.get("/api/profile/:id", checkJwt, checkSelfProfile, (req,res)=> {
    let userAuth0Id = req.params.id;
    db.SubcontractorProfile.findOne({auth0Id: userAuth0Id}).then(results => {
        res.json(results)
    });
});

app.post("/api/profile/:id", checkJwt, checkSelfProfile, (req,res)=> {
    let userAuth0Id = req.params.id;
    let update = req.body;
    db.SubcontractorProfile.findOneAndUpdate({auth0Id: userAuth0Id}, update).then(results => {
        res.json(results)
    });
});

//api routes for creating, updating, deleting projects
app.post("/api/project", checkJwt, checkWriteProjects,(req, res)=> {
    console.log(req.body);
    db.Project.create(req.body).then(dbProject => {
        res.json(dbProject);
    });
});



//if no other route is matched
app.use(function(req,res){
    res.sendFile(path.join(__dirname, "client/build/index.html"));
}); 

//--------------------------------- end routes-------------------------------------//



//starting up the server
app.listen(PORT, function(){
    console.log(`API Server now listening on port ${PORT}`);
  });
