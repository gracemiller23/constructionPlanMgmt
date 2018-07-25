const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const SubcontractorProfileSchema = new Schema({
    auth0Id: {type: String, required:true},
    profileStage: String,
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
    tradeCategory:String,
    bidInviteProj: [{ type : Schema.Types.ObjectId, ref: 'project' }],
    declinedBidInvite:[{ type : Schema.Types.ObjectId, ref: 'project' }],
    acceptedBidInvite:[{ type : Schema.Types.ObjectId, ref: 'project' }],
    awardedProjects:[{ type : Schema.Types.ObjectId, ref: 'project' }],
    archivedProjects:[{ type : Schema.Types.ObjectId, ref: 'project' }]
},{
    timestamps:true
});

const SubcontractorProfile = mongoose.model("SubcontractorProfile", SubcontractorProfileSchema);

module.exports = SubcontractorProfile;