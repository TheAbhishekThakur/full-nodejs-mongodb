const express = require("express");
const router = express.Router();
const fs = require("fs");
const { sendResponse, sendErrorResponse } = require("../utils/reqResFormat");

router.post("/write-file", (req, res, next) => {
  try {
    fs.writeFile("uploads/example.txt", req.body.jsonData, function (err) {
      if (err) {
        res
          .status(500)
          .send(sendErrorResponse(err, 2, "internal_server_error"));
        return console.log(err);
      }
      console.log("Hello World > helloworld.txt");
      res.status(200).send(sendResponse({}, 0, "file_write_successfully"));
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(sendErrorResponse(error, 2, "internal_server_error"));
  }
});

router.get("/read-file", (req, res, next) => {
  try {
    fs.readFile("uploads/example.txt", "utf8", function (err, data) {
      if (err) {
        res
          .status(500)
          .send(sendErrorResponse(err, 2, "internal_server_error"));
        return console.log(err);
      }
      res.status(200).send(sendResponse(data, 0, "success"));
      console.log(data);
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(sendErrorResponse(error, 2, "internal_server_error"));
  }
});

module.exports = router;
