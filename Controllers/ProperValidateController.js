const ProperValidateModel = require("../Models/ProperValidateModel");
const { sendResponse, sendErrorResponse } = require("../Utils/reqResFormat");

const validateFields = async (req, res, next) => {
    try {
        let created = await ProperValidateModel.create(req.body);
        res.status(200).send(sendResponse(created, 0, 'validated_all_fields'));
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}
module.exports = {
    validateFields
}