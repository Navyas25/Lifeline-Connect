const Donor = require("../models/Donor");
const Request = require("../models/Request");

exports.getStats = async (req, res) => {

try{

const donors = await Donor.countDocuments();
const requests = await Request.countDocuments();

const bloodStats = await Donor.aggregate([
{
$group:{
_id:"$bloodGroup",
count:{$sum:1}
}
}
]);

res.json({
totalDonors: donors,
totalRequests: requests,
bloodDistribution: bloodStats
});

}catch(err){

res.status(500).json({
error: err.message
});

}

};