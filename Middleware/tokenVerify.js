const jwt = require("jsonwebtoken");
const jwtPrivateKey = "abhishek-thakur-token";
const User = require("../Models/UserModel");

const verifyToken1 = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    if (bearerToken && bearerToken !== null) {
      jwt.verify(bearerToken, jwtPrivateKey, function (err, decoded) {
        if (err) {
          res
            .status(500)
            .send({ err_code: "invalid_token", message: "Invalid token" });
        } else {
          req.userId = decoded.user_id;
          req.name = decoded.name;
          next();
        }
      });
    } else {
      res
        .status(200)
        .send({ err_code: "not-found", message: "token not found" });
    }
  } else {
    res.status(200).send({ err_code: "not-found", message: "token not found" });
  }
};

const verifyToken2 = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "");
    const decode = jwt.verify(token.trim(), jwtPrivateKey);
    const user = await User.findOne({ _id: decode._id });
    if (!user) {
      throw new Error("Error");
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ status: "Token did not match" });
  }
};

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "");
    const decode = jwt.verify(token.trim(), jwtPrivateKey);
    const user = decode;
    if (!user) {
      throw new Error("Error");
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ status: "Token did not match" });
  }
};

function getJwtToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, jwtPrivateKey, function (err, decoded) {
      if (!err) {
        // attach data from token to request
        req.id = decoded.user_id;
      }
      next();
    });
  } else {
    next();
  }
}

module.exports = {
  verifyToken1,
  verifyToken2,
  auth,
  getJwtToken,
};
