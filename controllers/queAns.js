const QueAns = require("../models/queAns");
const { sendResponse, sendErrorResponse } = require("../utils/reqResFormat");

// Insert array of object
const createQueAns = async (req, res, next) => {
  try {
    let created = await QueAns.create(req.body);
    if (created) {
      res.status(200).send(sendResponse(created, 0, "created"));
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send(sendErrorResponse(error, 2, "internal_server_error"));
  }
};

// Update array of object
const updateQueAns = async (req, res, next) => {
  try {
    let updated_arr = req.body.queAnsDup;
    let updated = await QueAns.findOneAndUpdate(
      { _id: req.body._id },
      { queAnsDup: updated_arr }
    );

    console.log("updated", updated);
    if (updated) {
      res.status(200).send(sendResponse(updated, 0, "updated"));
    } else {
      res.status(500).send(sendErrorResponse(null, 2, "internal_server_error"));
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send(sendErrorResponse(error, 2, "internal_server_error"));
  }
};

module.exports = {
  createQueAns,
  updateQueAns,
};
