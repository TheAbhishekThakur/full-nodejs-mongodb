const express = require("express");
const router = express.Router();
const { upload } = require("../Utils/multer");
const {
  FirebaseMulter,
  uploadSingleFileOnFirebase,
  uploadMultipleFileOnFirebase,
} = require("../Utils/multerFirebase");
const { sendResponse, sendErrorResponse } = require("../Utils/reqResFormat");

router.use(express.static(__dirname + "./uploads/"));

// Upload one file using multer in a server folder
router.post(
  "/single-file-upload",
  upload.single("image"),
  function (req, res, next) {
    try {
      let response = req.file.filename;
      res
        .status(200)
        .send(sendResponse(response, 0, "file_uploaded_successfully"));
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .send(sendErrorResponse(error, 2, "internal_server_error"));
    }
  }
);

// Upload multiple file using multer in a server folder
router.post(
  "/multiple-file-upload",
  upload.array("files", 4),
  function (req, res, next) {
    try {
      let response = req.file;
      res
        .status(200)
        .send(sendResponse(response, 0, "file_uploaded_successfully"));
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .send(sendErrorResponse(error, 2, "internal_server_error"));
    }
  }
);

// Upload single file using multer on firebase
router.post(
  "/single-file-upload-firebse",
  FirebaseMulter.single("image"),
  uploadSingleFileOnFirebase,
  function (req, res) {
    try {
      let response = req.file.firebaseUrl;
      console.log("response", response);
      res
        .status(200)
        .send(sendResponse(response, 0, "file_uploaded_successfully"));
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .send(sendErrorResponse(error, 2, "internal_server_error"));
    }
  }
);

// Upload multiple file using multer on firebase
router.post(
  "/multiple-file-upload-firebse",
  FirebaseMulter.array("images",2),
  uploadMultipleFileOnFirebase,
  function (req, res) {
    try {
      let response = null;
      console.log("response", response);
      res
        .status(200)
        .send(sendResponse(response, 0, "file_uploaded_successfully"));
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .send(sendErrorResponse(error, 2, "internal_server_error"));
    }
  }
);

// Upload single file using multer on cloudinary

// Upload mutiple file using multer on cloudinary

// Upload single file using multer on AWS s3 bucket

// Upload mutiple file using multer on AWS s3 bucket

module.exports = router;
