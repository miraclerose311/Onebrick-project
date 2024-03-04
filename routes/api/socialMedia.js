const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs").promises;
const SocialMedia = require("../../models/SocialMedia");

router.get("/get", async (req, res) => {
    try {
      const results = await SocialMedia.find();
  
      const resultsWithImages = await Promise.all(
        results.map(async (item) => {
          try {
            const imagePath = `./uploads/social/${item.mediaType}.txt`;
            const image = await fs.readFile(imagePath, "utf8");
            return {
              ...item._doc, // Spread operator to copy properties from item._doc
              image: image  // Add the new image property
            };  
          } catch (err) {
            console.error(err);
            return item._doc;
          }
        })
      );
      res.status(200).json(resultsWithImages);
    } catch (e) {
      console.error(e);
      res.status(500).send("An error occurred during the operation.");
    }
  });

router.post("/insert", async (req, res) => {
  try {
    const filePath = `./uploads/social/${req.body.mediaType}.txt`;

    // Correctly using fs.promises.writeFile to write to the file.
    await fs.writeFile(filePath, req.body.base64String);

    const newSocialData = {
      link: req.body.link,
      content: req.body.content,
    };

    const result = await SocialMedia.updateOne(
      { mediaType: req.body.mediaType },
      { $set: newSocialData },
      { upsert: true }
    );

    if (result.upsertedId) {
      res.status(201).send("New document created.");
    } else if (result.nModified) {
      res.status(200).send("Document updated.");
    } else {
      res.status(200).send("No changes made to the document.");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred during the insert operation.");
  }
});

module.exports = router;
