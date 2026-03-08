const Request = require("../models/Request");

const createRequest = async (req, res) => {
  try {
    const request = new Request(req.body);

    const savedRequest = await request.save();

    // Emit socket event
    req.io.emit("newBloodRequest", savedRequest);

    res.status(201).json(savedRequest);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createRequest };