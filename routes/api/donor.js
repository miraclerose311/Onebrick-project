const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const Donor = require("../../models/Donor");
const Brick = require("../../models/Brick");
const User = require("../../models/User");

router.post("/insert", async (req, res) => {
  try {
    const {
      userId,
      fullName,
      email,
      mobile,
      pan,
      aadhaar,
      address,
      country,
      state,
      pin,
    } = req.body;

    const newDonor = {
      user: userId,
      fullName,
      email,
      mobile,
      pan,
      aadhaar,
      address,
      country,
      state,
      pin,
    };

    // Perform the upsert operation
    const result = await Donor.updateOne(
      { user: userId },
      { $set: newDonor },
      { upsert: true }
    );

    // Check if a new document was created by inspecting result.upsertedCount
    if (result.upsertedCount > 0) {
      // A new document was inserted
      res.status(201).json({
        message: "New donor has been added.",
        donorDetails: newDonor,
      });
    } else if (result.nModified > 0) {
      // An existing document was updated
      res.status(200).json({
        message: "Donor details have been updated.",
        donorDetails: newDonor,
      });
    } else {
      // No changes were made (the donor details were identical)
      res.status(200).json({
        message: "No changes were needed for this donor.",
        donorDetails: newDonor,
      });
    }
  } catch (error) {
    console.error(`Error during /insert route processing: ${error.message}`);
    res.status(500).send("Server error");
  }
});
// {
//   $lookup: {
//     from: "users",
//     localField: "user",
//     foreignField: "_id",
//     as: "donor",
//   },
// },
router.get("/current-donors", async (req, res) => {
  try {
    const result = await Brick.aggregate([
      { $match: { sold: true } },
      {
        $sort: { date: 1 },
      },
      {
        $group: {
          _id: "$user",
          purchasedBricksCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "donors",
          localField: "_id",
          foreignField: "user",
          as: "donorInfo",
        },
      },
      { $unwind: "$donorInfo" },
      {
        $project: {
          _id: 0,
          user: "$donorInfo.user",
          fullName: "$donorInfo.fullName",
          // email: "$donorInfo.email",
          // mobile: "$donorInfo.mobile",
          // address: "$donorInfo.address",
          // country: "$donorInfo.country",
          // state: "$donorInfo.state",
          // pin: "$donorInfo.pin",
          // pan: "$donorInfo.pan",
          purchasedBricksCount: 1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          avatar: "$user.picture",
          fullName: 1,
          // email: 1,
          // mobile: 1,
          // address: 1,
          // country: 1,
          // state: 1,
          // pin: 1,
          // pan: 1,
          purchasedBricksCount: 1,
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Server error", error);
  }
});

// router.get("/allDonorInfo", async (req, res) => {
// 	try {
// 		const result = await Brick.aggregate([
// 			{ $match: { sold: true } },
// 			{
// 				$sort: { date: 1 },
// 			},
// 			{
// 				$group: {
// 					_id: "$user",
// 					purchasedBricksCount: { $sum: 1 },
// 				},
// 			},
// 			{
// 				$lookup: {
// 					from: "donors",
// 					localField: "_id",
// 					foreignField: "user",
// 					as: "donorInfo",
// 				},
// 			},
// 			{ $unwind: "$donorInfo" },
// 			{
// 				$project: {
// 					_id: 0,
// 					user: "$donorInfo.user",
// 					fullName: "$donorInfo.fullName",
// 					// email: "$donorInfo.email",
// 					// mobile: "$donorInfo.mobile",
// 					// address: "$donorInfo.address",
// 					// country: "$donorInfo.country",
// 					// state: "$donorInfo.state",
// 					// pin: "$donorInfo.pin",
// 					// pan: "$donorInfo.pan",
// 					purchasedBricksCount: 1,
// 				},
// 			},
// 			{
// 				$lookup: {
// 					from: "users",
// 					localField: "user",
// 					foreignField: "_id",
// 					as: "user",
// 				},
// 			},
// 			{ $unwind: "$user" },
// 			{
// 				$project: {
// 					avatar: "$user.picture",
// 					fullName: 1,
// 					// email: 1,
// 					// mobile: 1,
// 					// address: 1,
// 					// country: 1,
// 					// state: 1,
// 					// pin: 1,
// 					// pan: 1,
// 					purchasedBricksCount: 1,
// 				},
// 			},
// 		]);
// 		res.status(200).json(result);
// 	} catch (error) {
// 		res.status(500).send("Server error", error);
// 	}
// });

router.get("/donorcount", async (req, res) => {
  try {
    const donor = await Donor.find().count();
    // const fakedonor = await Donor.find({ fake: true }).count();
    res.json(donor);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/get-donor", async (req, res) => {
  try {
    Donor.findOne({ user: req.body.userId }).then((response) => {
      res.json(response);
    });
  } catch {
    (e) => {
      console.logo(e);
    };
  }
});

router.get("/current_page", async (req, res) => {
  try {
    let { page, limit, term, mobile, country, state, address, pin, pan } =
      req.query;
    let sort_query = {};
    let filter_query = {};

    // Add text search to filter_query if term is provided
    if (term && term !== "") {
      filter_query.$expr = {
        $or: [
          { $regexMatch: { input: "$fullName", regex: term, options: "i" } },
          { $regexMatch: { input: "$email", regex: term, options: "i" } },
          { $regexMatch: { input: "$mobile", regex: term, options: "i" } },
          { $regexMatch: { input: "$pin", regex: term, options: "i" } },
          { $regexMatch: { input: "$pan", regex: term, options: "i" } },
          { $regexMatch: { input: "$address", regex: term, options: "i" } },
          { $regexMatch: { input: "$country", regex: term, options: "i" } },
          { $regexMatch: { input: "$state", regex: term, options: "i" } },
        ],
      };
    }

    if (mobile != 0) sort_query.mobile = parseInt(mobile);
    if (country != 0) sort_query.country = parseInt(country);
    if (state != 0) sort_query.state = parseInt(state);
    if (address != 0) sort_query.address = parseInt(address);
    if (pin != 0) sort_query.pin = parseInt(pin);
    if (pan != 0) sort_query.pan = parseInt(pan);

    // Parse 'page' and 'limit' as integers
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;

    // Define the pipeline to get the total count
    const countPipeline = [
      { $group: { _id: null, total: { $sum: 1 } } },
      { $project: { _id: 0, total: 1 } },
    ];

    // Execute the count pipeline to get the total number of documents
    const totalCountResult = await Donor.aggregate(countPipeline).exec();
    const totalDocuments =
      totalCountResult.length > 0
        ? Math.ceil(totalCountResult[0].total / limit)
        : 0;

    const dataPipeline = [
      { $match: { sold: true } },
      {
        $group: {
          _id: "$user",
          purchasedBricksCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "donors",
          localField: "_id",
          foreignField: "user",
          as: "donorInfo",
        },
      },
      { $unwind: "$donorInfo" },
      {
        $project: {
          _id: 0,
          fullName: "$donorInfo.fullName",
          email: "$donorInfo.email",
          mobile: "$donorInfo.mobile",
          address: "$donorInfo.address",
          country: "$donorInfo.country",
          state: "$donorInfo.state",
          pin: "$donorInfo.pin",
          pan: "$donorInfo.pan",
          purchasedBricksCount: 1,
        },
      },
      ...(Object.keys(filter_query).length ? [{ $match: filter_query }] : []),
      ...(Object.keys(sort_query).length ? [{ $sort: sort_query }] : []),
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];

    // Fetch the documents based on the query and pagination options
    const documents = await Brick.aggregate(dataPipeline).exec();
    // Send back the total count along with the documents
    res.json({
      totalDocuments,
      documents,
      page,
      limit,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
