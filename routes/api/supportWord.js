const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const SupportWard = require("../../models/SupportWard");

router.get("/get", async (req, res) => {
  try {
    const result = SupportWard.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ]);
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    // If an error occurs, send an internal server error status code.
    res.status(500).send("An error occurred during the update operation.");
  }
});

router.post("/insert", async (req, res) => {
  const reqData = req.body;
  try {
    await SupportWard.insertMany(reqData);

    // If the operation was successful, send the updated document back to the client.
    res.status(200).json({
      message: "Support word inserted successfully",
    });
  } catch (e) {
    console.error(e);
    // If an error occurs, send an internal server error status code.
    res.status(500).send("An error occurred during the insert support word.");
  }
});

module.exports = router;
