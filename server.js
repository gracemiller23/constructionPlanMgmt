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

app.get("/api/test", checkJwt, checkReadProjects, (req,res)=> {
    db.SubcontractorProfile.find({}).sort({createdAt: -1}).then(results => {
        res.json(results)
        }
    );
});

app.post("/api/firstprofile", checkJwt, checkFirstUser, (req, res)=>{
    db.SubcontractorProfile.create(req.body).then(dbSubProfile => {
        console.log(dbSubProfile)
        res.json(dbSubProfile);
    })
} )

//routes for profile elements stored in MongoDB
app.get("/api/profile", checkJwt, checkSelfProfile, (req,res)=> {
    console.log(`inside route and I am working`);
        res.json("I worked!");
});

app.post("/api/profile", checkJwt, checkSelfProfile, (req,res)=> {
    console.log(`inside route and I am working`);
        res.json("I worked!");
});
 
app.post("/api/test", checkJwt, checkWriteProjects,(req, res)=> {
    console.log(req.body);
    SubcontractorProfile.create(req.body).then(dbSubProfile => {
        res.json(dbSubProfile);
    })
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
