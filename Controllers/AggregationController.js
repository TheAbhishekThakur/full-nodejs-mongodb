const User = require("../Models/UserModel");
const { sendResponse, sendErrorResponse } = require("../Utils/reqResFormat");

// $match -> It return an array
const findOneDoc = async (req, res) => {
  try {
    const pipeline = [{ $match: { email: req.body.email } }];
    const data = await User.aggregate(pipeline);
    if (data.length === 0) {
      res.status(500).send(sendErrorResponse(null, 1, "no_data_found"));
    }
    res.status(200).send(sendResponse(data, 0, "success"));
  } catch (err) {
    res.status(500).send(sendErrorResponse(err, 2, "internal_server_error"));
  }
};

// $group
const findOneDoc2 = async (req, res) => {
  try {
    const pipeline = [
      { $match: { name: req.body.name } },
      { $group: { _id: "$isDeleted", count: { $sum: 1 } } },
    ];
    const data = await User.aggregate(pipeline);
    if (data.length === 0) {
      res.status(500).send(sendErrorResponse(null, 1, "no_data_found"));
    }
    res.status(200).send(sendResponse(data, 0, "success"));
  } catch (err) {
    res.status(500).send(sendErrorResponse(err, 2, "internal_server_error"));
  }
};

module.exports = {
  findOneDoc,
  findOneDoc2,
};


// Reference :- https://www.mongodb.com/docs/drivers/node/current/fundamentals/aggregation/