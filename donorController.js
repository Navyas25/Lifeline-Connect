const Donor = require("../models/Donor");


// Add New Donor
const createDonor = async (req, res) => {
  try {
    res.json({ message: "Donor created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createDonor };

// Get All Donors
exports.getAllDonors = async (req, res) => {
  try {

    const donors = await Donor.find();

    res.status(200).json({
      success: true,
      count: donors.length,
      donors
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get Single Donor
exports.getDonorById = async (req, res) => {
  try {

    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found"
      });
    }

    res.status(200).json({
      success: true,
      donor
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Delete Donor
exports.deleteDonor = async (req, res) => {
  try {

    const donor = await Donor.findByIdAndDelete(req.params.id);

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Donor deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Find Nearby Donors
exports.findNearbyDonors = async (req, res) => {
  try {

    const { latitude, longitude, bloodGroup } = req.query;

    const donors = await Donor.find({
      bloodGroup: bloodGroup,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 5000   // 5 km
        }
      }
    });

    res.status(200).json({
      success: true,
      count: donors.length,
      donors
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};