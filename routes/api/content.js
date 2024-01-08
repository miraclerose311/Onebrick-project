const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Content = require("../../models/Content");

router.get("/getContents", async (req, res) => {
  try {
    const result = await Content.find();
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    // If an error occurs, send an internal server error status code.
    res.status(500).send("An error occurred during the update operation.");
  }
});

router.post("/update", async (req, res) => {
  const contentData = req.body;

  if (!contentData || !contentData.name) {
    // Ensure there is content data and a name provided to find the document.
    return res.status(400).send("Content data or name not provided.");
  }

  try {
    const updateResult = await Content.findOneAndUpdate(
      { name: contentData.name },
      { $set: contentData },
      { new: true, upsert: true }
    );

    // If the operation was successful, send the updated document back to the client.
    res.status(200).json({
      message: "Content updated successfully",
      updatedDocument: updateResult,
    });
  } catch (e) {
    console.error(e);
    // If an error occurs, send an internal server error status code.
    res.status(500).send("An error occurred during the update operation.");
  }
});

module.exports = router;
