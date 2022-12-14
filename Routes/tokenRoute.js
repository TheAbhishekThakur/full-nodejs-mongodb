const express = require("express");
const router = express.Router();
const { sendResponse, sendErrorResponse } = require("../Utils/reqResFormat");
const {
  verifyToken1,
  verifyToken2,
  auth,
  getJwtToken,
} = require("../Middleware/tokenVerify");
// Token
var jwt = require("jsonwebtoken");

// Generate Token
router.get("/generate-token", async (req, res, next) => {
  try {
    let token = jwt.sign(
      { name: "Abhishek Thakur", age: 25 },
      "abhishek-thakur-token",
      { expiresIn: 60 * 60 }
    );
    res.status(200).send(sendResponse({ token: token }, 0, "token-data"));
  } catch (error) {
    console.log("error", error);
    res.status(500).send(sendErrorResponse(error, 2, "internal_server_error"));
  }
});

// Verify Token
router.get("/verify-token", auth, async (req, res, next) => {
  let data = req.user;
  res
    .status(200)
    .send(sendResponse({ tokenSavedData: data }, 0, "token-verified"));
});

module.exports = router;