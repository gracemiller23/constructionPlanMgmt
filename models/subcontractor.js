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
    acknowledgeTerms: String,
    bidInviteProj: [{ type : Schema.Types.ObjectId, ref: 'Project' }],
    declinedBidInvite:[{ type : Schema.Types.ObjectId, ref: 'Project' }],
    acceptedBidInvite:[{ type : Schema.Types.ObjectId, ref: 'Project' }],
    awardedProjects:[{ type : Schema.Types.ObjectId, ref: 'Project' }],
    archivedProjects:[{ type : Schema.Types.ObjectId, ref: 'Project' }]
},{
    timestamps:true
});

const SubcontractorProfile = mongoose.model("SubcontractorProfile", SubcontractorProfileSchema);

module.exports = SubcontractorProfile;