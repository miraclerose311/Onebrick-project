const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
let filePath = "./uploads/myString.txt";

router.get("/image", (req, res) => {
  console.log("File Upload router");
  res.jsong("File Upload router");
});
// Endpoint to receive the image upload
router.post("/image", async (req, res) => {
  try {
    const { fileName, base64String } = req.body;

    if (!fileName || !base64String) {
      throw new Error("fileName or base64String is missing");
    }

    // Define the file path
    const filePath = `./uploads/${fileName}.txt`;

    // Write the Base64 string to file asynchronously
    await fs.writeFile(filePath, base64String);

    console.log("File saved to", filePath);

    // Read the file back asynchronously
    const fileContent = await fs.readFile(filePath, "utf8");

    // Send the file content as a response
    res.json(fileContent);
  } catch (err) {
    console.error("An error occurred:", err);
    res.status(500).json({ message: "Failed to save the image" });
  }
});

module.exports = router;
