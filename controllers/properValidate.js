const ProperValidate = require("../models/properValidate");
const { sendResponse, sendErrorResponse } = require("../utils/reqResFormat");

const validateFields = async (req, res, next) => {
  try {
    let created = await ProperValidate.create(req.body);
    res.status(200).send(sendResponse(created, 0, "validated_all_fields"));
  } catch (error) {
    console.log("error", error);
    res.status(500).send(sendErrorResponse(error, 2, "internal_server_error"));
  }
};
module.exports = {
  validateFields,
};
