const express = require('express');
const router = express.Router();
const { upload } = require("../Utils/multer");
const { sendResponse, sendErrorResponse } = require("../Utils/reqResFormat");

router.use(express.static(__dirname + "./uploads/"));

// Upload one file using multer
router.post("/single-file-upload", upload.single("image"), function (req, res, next) {
    try {
        let response = req.file.filename;
        res.status(200).send(sendResponse(response, 0, 'file_uploaded_successfully'));
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
});


// Upload multiple file using multer
router.post("/multiple-file-upload", upload.array("files",4), function (req, res, next) {
    try {
        let response = req.file;
        res.status(200).send(sendResponse(response, 0, 'file_uploaded_successfully'));
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }

});

module.exports = router;