const Donor = require("../models/Donor");

async function findMatchingDonors(queryVector){

const result = await Donor.aggregate([
{
$vectorSearch:{
index:"donorVectorIndex",
path:"embedding",
queryVector:queryVector,
numCandidates:100,
limit:5
}
}
]);

return result;

}

module.exports = findMatchingDonors;