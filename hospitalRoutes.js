const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");

/* ===============================
   REGISTER HOSPITAL
================================ */

router.post("/register", async (req, res) => {
  try {

    const { name, city, contact } = req.body;

    const hospital = new Hospital({
      name,
      city,
      contact
    });

    await hospital.save();

    res.json({ message: "Hospital registered successfully" });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }
});

/* ===============================
   GET ALL HOSPITALS
================================ */

router.get("/", async (req, res) => {
  try {

    const hospitals = await Hospital.find();
    res.json(hospitals);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }
});

module.exports = router;