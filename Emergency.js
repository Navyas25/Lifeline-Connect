const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema({

  patientName: String,

  bloodGroup: String,

  hospital: String,

  city: String,

  contact: String,

  units: Number,

  urgency: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Emergency", emergencySchema);