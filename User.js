const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

name:String,

email:{
type:String,
unique:true
},

password:String,

role:{
type:String,
enum:["donor","hospital","admin"],
default:"donor"
}

});

module.exports = mongoose.model("User", userSchema);