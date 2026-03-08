const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  gender: {
    type: String,
    required: true
  },

  bloodGroup: {
    type: String,
    required: true
  },

  height: {
    type: Number
  },

  weight: {
    type: Number
  },

  city: {
    type: String,
    required: true
  },
  contact: {
  type: String,
  required: true
},
  

  disease: {
    type: String,
    default: "No"
  },

  otherDisease: {
    type: String,
    default: ""
  },

  // OPTIONAL LOCATION (for future map feature)
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    }
  }

});

// Geospatial index (for nearby donor search)
donorSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Donor", donorSchema);