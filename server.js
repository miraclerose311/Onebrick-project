const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/users", require("./routes/api/user"));
app.use("/api/brick", require("./routes/api/brick"));
app.use("/api/donor", require("./routes/api/donor"));
app.use("/api/payment", require("./routes/api/payment"));

// Serve static assets in production
// if (process.env.NODE_ENV === "production") {
// 	// Set static folder
// 	app.use(express.static("client/dist"));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// 	});
// }
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
	console.log(`Server started on ${PORT}`);
});
