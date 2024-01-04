const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
let filePath = "./uploads/myString.txt";


// Endpoint to receive the image upload


// router.post("/image", async (req, res) => {
//   try {
//     const { formData } = req.body;
//     const files = Object.keys(formData);

//     if (files.length === 0) {
//       return res.status(400).json({ message: "There are no files" });
//     }

//     // Wait for all files to be processed
//     await Promise.all(
//       files.map(async (file) => {
//         if (formData[file] !== "") {
//           const filePath = `./uploads/${file}.txt`;
//           // Write the Base64 string to file asynchronously
//           await fs.writeFile(filePath, formData[file]);
//         }
//       })
//     );

//     // Send back a success response
//     res.json({ message: "Files saved successfully" });
//   } catch (err) {
//     console.error("An error occurred:", err);
//     res.status(500).json({ message: "Failed to save the images" });
//   }
// });

router.post("/image", async (req, res) => {
  try {
    const { imageData } = req.body;
    const files = Object.keys(imageData);
    if (files.length === 0) {
      return res.status(400).json({ message: "There are no files" });
    }

    // Wait for all files to be processed
    await Promise.all(
      files.map(async (file) => {
        if (imageData[file] !== "") {
          const filePath = `./uploads/${file}.txt`;
          // Write the Base64 string to file asynchronously
          await fs.writeFile(filePath, imageData[file]);
        }
      })
    );

    // Send back a success response
    res.json({ message: "Files saved successfully" });
  } catch (err) {
    console.error("An error occurred:", err);
    res.status(500).json({ message: "Failed to save the images" });
  }
});



module.exports = router;
