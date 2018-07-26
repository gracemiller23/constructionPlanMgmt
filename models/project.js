const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    projectName: String,
    projectLocation: String,
    invitedSubcontractors: [{ type : Schema.Types.ObjectId, ref: 'SubcontractorProfile' }],
    biddingSubcontractors:[{ type : Schema.Types.ObjectId, ref: 'SubcontractorProfile' }],
    awardedSubcontractors:[{ type : Schema.Types.ObjectId, ref: 'SubcontractorProfile' }]
},{
    timestamps:true
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;