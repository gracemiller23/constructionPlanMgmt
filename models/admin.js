const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminProfileSchema = new Schema({
    auth0Id: {type: String, required:true},
    companyName: String,
    companyAddress1: String,
    companyAddress2:String,
    companyCity:String,
    companyState:String,
    companyZip:Number,
    contactName:{
        firstName: String,
        lastName: String},
    contactPhone:Number,
    contactEmail:String,
    bidInviteSentProj: [{ type : Schema.Types.ObjectId, ref: 'project' }],
    subSelectedProj:[{ type : Schema.Types.ObjectId, ref: 'project' }],
    archivedProjects:[{ type : Schema.Types.ObjectId, ref: 'project' }]
},{
    timestamps:true
});

const AdminProfile = mongoose.model("AdminProfile", AdminProfileSchema);

module.exports = AdminProfile;