const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");

// Register donor
router.post("/register", async (req, res) => {

    try {

        const {
            name,
            age,
            gender,
            bloodGroup,
            height,
            weight,
            city,
            contact,
            disease,
            otherDisease
        } = req.body;

        const donor = new Donor({
            name,
            age,
            gender,
            bloodGroup,
            height,
            weight,
            city,
            contact,
            disease,
            otherDisease
        });

        await donor.save();

        res.status(201).json({
            message: "Donor registered successfully"
        });

    } catch (error) {

        console.error("Registration Error:", error);

        res.status(500).json({
            message: "Server error while registering donor"
        });

    }

});


// Get all donors
router.get("/", async (req, res) => {

    try {

        const donors = await Donor.find();

        res.json(donors);

    } catch (error) {

        console.error("Fetch Error:", error);

        res.status(500).json({
            message: "Error fetching donors"
        });

    }

});

module.exports = router;