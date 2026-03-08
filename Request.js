// models/Request.js

const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
name: String,
bloodGroup: String,
location: String,
contact: String,
status: {
type: String,
default: "pending"
}
});

module.exports = mongoose.model("Request", requestSchema);