const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const SupportWard = require("../../models/SupportWard");

router.get("/get", async (req, res) => {
  try {
    const result = await SupportWard.find().populate("user");
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    // If an error occurs, send an internal server error status code.
    res.status(500).send("An error occurred during the update operation.");
  }
});

router.post("/insert", async (req, res) => {
  const inputData = { ...req.body, date: Date() };
  try {
    const insertedResult = await SupportWard.collection.insertOne(inputData);
    const insertedId = insertedResult.insertedId;
    const supportedWard = await SupportWard.findById(insertedId).populate(
      "user"
    );
    if (supportedWard) {
      res.status(200).json(supportedWard);
    } else {
      res.status(404).send("Document not found.");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred during the insert support word.");
  }
});

module.exports = router;
