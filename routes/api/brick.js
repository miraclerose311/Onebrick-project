const express = require("express");
const router = express.Router();
const faker = require("faker");
const auth = require("../../middleware/auth");
const nodemailer = require("nodemailer");

const Brick = require("../../models/Brick");
const Donor = require("../../models/Donor");
const User = require("../../models/User");

const randomIds = require("./initialValue.js");
const { randomInt } = require("crypto");
const { default: mongoose } = require("mongoose");

const brickCount = process.env.BRICK_COUNT

router.get("/test", (req, res) => {
  res.json("test!");
});

router.post("/initial", async (req, res) => {
  let count = brickCount;
  try {
    await Brick.deleteMany({});
    let brickArray = [];
    for (let i = 0; i < count; i++) {
      brickArray.push({
        no: i,
        brick_id: randomIds[i],
        sold: false,
      });
    }
    await Brick.insertMany(brickArray);
    res.json(`Successfully initialized ${count} bricks.`);
  } catch (error) {
    console.error("Error inserting fake data:", error);
  }
});

// router.post("/initial", async (req, res) => {
// 	try {
// 		const fakeBricks = [];
// 		const count = 35000;

// 		await Brick.deleteMany({});

// 		const users = await User.find();
// 		let j = 0;
// 		const percent = req.body.count / count;
// 		for (let i = 0; i < count; i++) {
// 			if (Math.random() < percent) {
// 				fakeBricks.push({
// 					user: users[j]._id,
// 					brick_id: bricksID[i],
// 					amount: faker.datatype.number({ max: 10 }),
// 					date: faker.date.past(1),
// 					dedication: {
// 						name: faker.name.findName(),
// 						relationship: faker.lorem.word(),
// 						message: faker.lorem.sentence(),
// 						image: {
// 							imageName: faker.system.fileName(),
// 							imagePath: faker.image.imageUrl(),
// 						},
// 					},
// 					sold: true,
// 					fake: true,
// 				});
// 				j++;
// 			} else {
// 				fakeBricks.push({
// 					brick_id: bricksID[i],
// 					sold: false,
// 				});
// 			}
// 		}

// 		await Brick.insertMany(fakeBricks);
// 		res.json(`Successfully added ${count} fake bricks.`);
// 	} catch (error) {
// 		console.error("Error inserting fake data:", error);
// 	}
// });

//get sold amound for wallofbrick

router.get("/sold-amount", async (req, res) => {
  await Brick.find({ sold: true })
    .count()
    .then((amount) => {
      res.json(amount);
    });
});

router.get("/all", async (req, res) => {
  const dataPipeline = [
    {
      $lookup: {
        from: "donors",
        localField: "user",
        foreignField: "user",
        as: "donor",
      },
    },
    {
      $project: {
        no: 1,
        brick_id: 1,
        sold: 1,
        date: 1,
        user: 1,
        dedication: 1,
        donor: { $arrayElemAt: ["$donor", 0] },
      },
    },
  ];

  const bricks = await Brick.aggregate(dataPipeline).exec();
  res.json(bricks);
});

const getRandomBrickId = async (amount, stage) => {
  const quater = process.env.BRICK_COUNT / 4;
  let UnpurchasedBricks = await Brick.aggregate([
    { $skip: (4 - stage) * quater },
    { $match: { sold: false } },
  ]);
  let RandomId = [];
  for (let i = 0; i < amount; i++) {
    const randomInt = Math.floor(Math.random() * UnpurchasedBricks.length);
    RandomId.push(UnpurchasedBricks[randomInt].brick_id);
  }
  return RandomId;
};


function getRandomNeighbors(matrixRows, matrixCols, i, j, count) {
  let flag = Array.from({ length: matrixRows }, () =>
    Array(matrixCols).fill(false)
  );
  flag[i][j] = true;
  function isValid(neighborRow, neighborCol) {
    if (
      neighborRow >= 0 &&
      neighborRow < matrixRows &&
      neighborCol >= 0 &&
      neighborCol < matrixCols
    ) {
      return !flag[neighborRow][neighborCol];
    } else {
      return false;
    }
  }
  function randomIJ(i, j) {
    const potentialNeighbors = [
      [i - 1, j],
      [i, j - 1],
      [i, j + 1],
      [i + 1, j],
    ];
    // console.log(potentialNeighbors);
    const validNeighbors = potentialNeighbors.filter((n) =>
      isValid(n[0], n[1])
    );
    // console.log(validNeighbors);
    const IJ = Math.floor(Math.random() * validNeighbors.length);
    return validNeighbors[IJ];
  }
  let list = [];
  ii = i;
  jj = j;
  list.push([ii, jj]);
  for (let k = count - 1; k > 0; k--) {
    present = randomIJ(ii, jj);
    flag[ii][jj] = true;
    list.push(present);
    ii = present[0];
    jj = present[1];
  }
  return list;
}
const rows = 320;
const cols = 125;

// const getRandom = async (brick_id, amount) => {
//   console.log(brick_id)
//   const brick = await Brick.find({brick_id: brick_id});
//   let id = [];
//   const number = brick[0].no;
//   id.push(brick[0].no);
//   const i = number % 320;
//   const j = Math.floor(number / rows);
//   const randomNeighbors = getRandomNeighbors(rows, cols, i, j, amount);
//   randomNeighbors.map((key) => {
//     id.push(key[1] * rows + key[0]);
//   });
//   return id
// }


router.post("/buy", async (req, res) => {
  const { brick_id, user, amount, stage } = req.body;
  try {
    const donor = await Donor.findOne({ user: user });
    let updatePromises = [
      Brick.updateOne(
        { brick_id },
        {
          $set: {
            user,
            date: new Date(),
            sold: true,
          },
        }
      ),
    ];

    let purchasedIds = [brick_id];
    if (amount > 1) {
      const randomIDs = await getRandomBrickId(amount - 1, stage);
      
      purchasedIds.push(...randomIDs);

      const updateRandomBricks = randomIDs.map((id) =>
        Brick.updateOne(
          { brick_id: id },
          {
            $set: {
              user,
              date: new Date(),
              sold: true,
            },
          }
        )
      );
      updatePromises.push(...updateRandomBricks);
    }

    // Execute all updates simultaneously and wait until they are all done
    await Promise.all(updatePromises);

    res.json({ purchasedIds, user, date: new Date(), donor });

    // const userInfo = await User.findById(user);
    // sendMail(userInfo.email);
  } catch (error) {
    // Handle errors appropriately
    console.error("Failed to buy bricks:", error);
    res.status(500).json({ message: "Error processing your request" });
  }
});

router.get("/saleInfo/byday", async (req, res) => {
  // Parse query parameters safely, providing defaults if they are invalid.
  const year = parseInt(req.query.year) || new Date().getFullYear();
  const month = parseInt(req.query.month) || new Date().getMonth() + 1;

  const response = await Brick.aggregate([
    {
      $match: {
        date: { $exists: true, $ne: null },
        sold: true,
        $expr: {
          $and: [
            // Use $and to add multiple conditions
            { $eq: [{ $year: "$date" }, year] },
            { $eq: [{ $month: "$date" }, month] },
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          day: { $dayOfMonth: "$date" },
        },
        totalSales: { $sum: 1 },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  res.json(response);
});

router.get("/saleInfo/bymonth", async (req, res) => {
  // Parse query parameters safely, providing defaults if they are invalid.
  const year = parseInt(req.query.year) || new Date().getFullYear();

  const response = await Brick.aggregate([
    {
      $match: {
        date: { $exists: true, $ne: null },
        sold: true,
        $expr: { $eq: [{ $year: "$date" }, year] },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
        },
        totalSales: { $sum: 1 },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  res.json(response);
});

router.get("/current_page", async (req, res) => {
  try {
    let { brick_id, date, amount, page, limit, term } = req.query;
    let filter_query = {};
    let sort_query = {};

    brick_id = parseInt(brick_id);
    date = parseInt(date);
    amount = parseInt(amount);

    if (brick_id !== 0) sort_query.brick_id = brick_id;
    if (date !== 0) sort_query.date = date;
    if (amount !== 0) sort_query.amount = amount;

    // Add text search to filter_query if term is provided
    if (term && term !== "") {
      filter_query.$expr = {
        $or: [
          { $regexMatch: { input: "$brick_id", regex: term, options: "i" } },
          {
            $regexMatch: {
              input: "$donor.fullName",
              regex: term,
              options: "i",
            },
          },
          {
            $regexMatch: {
              input: "$dedication.name",
              regex: term,
              options: "i",
            },
          },
          {
            $regexMatch: {
              input: "$dedication.relationship",
              regex: term,
              options: "i",
            },
          },
          {
            $regexMatch: {
              input: "$dedication.message",
              regex: term,
              options: "i",
            },
          },
        ],
      };
    }

    filter_query.sold = true;

    // Parse 'page' and 'limit' as integers
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;

    // Define the pipeline to get the total count
    const countPipeline = [
      ...(Object.keys(filter_query).length ? [{ $match: filter_query }] : []),
      { $group: { _id: null, total: { $sum: 1 } } },
      { $project: { _id: 0, total: 1 } },
    ];

    // Execute the count pipeline to get the total number of documents
    const totalCountResult = await Brick.aggregate(countPipeline).exec();
    const totalPages =
      totalCountResult.length > 0
        ? Math.ceil(totalCountResult[0].total / limit)
        : 0;
    // Now define the pipeline to fetch the documents
    const dataPipeline = [
      {
        $lookup: {
          from: "donors",
          localField: "user",
          foreignField: "user",
          as: "donor",
        },
      },
      { $unwind: "$donor" },
      ...(Object.keys(sort_query).length ? [{ $sort: sort_query }] : []),
      ...(Object.keys(filter_query).length ? [{ $match: filter_query }] : []),
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];

    // Fetch the documents based on the query and pagination options
    const documents = await Brick.aggregate(dataPipeline).exec();
    // Send back the total count along with the documents
    res.json({
      totalPages,
      documents,
      page,
      limit,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.post("/add-dedication", async (req, res) => {
  try {
    const { brick_id, name, relationship, message, image } = req.body;
    const brick_Info = await Brick.findOne({ brick_id: brick_id });

    const { date, user } = brick_Info;
    let bricks = [];
    await Brick.find({
      user: user,
      date: {
        $gt: new Date(date.getTime() - 1000),
        $lt: new Date(date.getTime() + 1000),
      },
    }).then((result) => {
      result.forEach((brick) => {
        bricks.push(brick.brick_id);
      });
    });
    const dedication = {
      name,
      relationship,
      message,
      image,
    };
    // update brick by id
    Brick.updateMany(
      { brick_id: { $in: bricks } },
      { $set: { dedication: dedication } }
    )
      .then(() => res.json({ bricks, name, relationship, message, image }))
      .catch((e) => console.log(e));
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// const sendMail = (receiveMail) => {
//   console.log("receiveMail", receiveMail);
//   const htmlEmail = `
//       <h3>Contact Details</h3>
//       <ul>
//           <li>Name: Benjamin Tan</li>
//           <li>Phone: 123456789</li>
//           <li>Email: bentan010918@gmail.com</li>
//       </ul>
//       <h3>Message</h3>
//       <p>Hello, Welcome!</p>
//   `;

//   const smtpTransport = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       // XOAuth2: {
//       //   user: "bentan010918@gmail.com", // Your gmail address.
//       //   clientId:
//       //     "73111663663-4ilal0d51gufeuos3ukjtmn3kd6r8vum.apps.googleusercontent.com",
//       //   clientSecret: "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",
//       //   refreshToken:
//       //     "1//046T_aqawSsOOCgYIARAAGAQSNwF-L9IrHwwlDlTfGMqi9eGptA5rRkwZ3-0krYH4XO0mg2xUTD_JaBPbnT61LPCpSghcCarQQJ8",
//       // },
//       user: "bentan010918@gmail.com",
//       pass: "qoseugjf2750",
//     },
//   });

//   const mailOptions = {
//     from: "bentan010918@gmail.com",
//     to: receiveMail,
//     subject: "Hello",
//     generateTextFromHTML: true,
//     html: htmlEmail,
//   };

//   smtpTransport.sendMail(mailOptions, function (error, response) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(response);
//     }
//     smtpTransport.close();
//   });
// };


module.exports = router;
