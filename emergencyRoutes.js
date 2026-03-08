const express = require("express");
const router = express.Router();

const Emergency = require("../models/Emergency");

/* ===========================
   CREATE EMERGENCY REQUEST
=========================== */

router.post("/", async (req, res) => {

  try {

    const emergency = new Emergency(req.body);

    await emergency.save();

    /* SEND REAL-TIME ALERT */

    req.io.emit("newEmergency", emergency);

    res.json({
      message: "🚨 Emergency request created",
      data: emergency
    });

  } catch (err) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});

/* ===========================
   GET ALL EMERGENCIES
=========================== */

router.get("/", async (req, res) => {

  try {

    const emergencies = await Emergency
      .find()
      .sort({ createdAt: -1 });

    res.json(emergencies);

  } catch (err) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});

module.exports = router;