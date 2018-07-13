const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubcontractorProfileSchema = new Schema({
    title: String,
    body: String
});

const SubcontractorProfile = mongoose.model("SubcontractorProfile", SubcontractorProfileSchema);

module.exports = SubcontractorProfile;