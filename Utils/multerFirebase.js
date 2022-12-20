// Firebase Setup
const admin = require("firebase-admin");
const serviceAccount = require("../Config/nodejs-multer-firebase-firebase-adminsdk-aq8jz-7fc604db46.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://nodejs-multer-firebase.appspot.com",
});

const firebaseBucket = admin.storage().bucket();

const uploadSingleFileOnFirebase = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const image = req.file;
  const fileName = Date.now() + "." + image.originalname.split(".").pop();
  const file = firebaseBucket.file(fileName);
  const stream = file.createWriteStream({
    metaData: {
      contentType: image.mimeType,
    },
  });

  stream.on("error", (e) => {
    console.log(e);
  });

  stream.on("finish", async () => {
    try {
      await file.makePublic();
      req.file.firebaseUrl = `${firebaseBucket.storage.apiEndpoint}/${firebaseBucket.name}/${fileName}`;
      next();
    } catch (err) {
      console.log(err);
    }
  });

  stream.end(image.buffer);
};


const uploadMultipleFileOnFirebase = (req, res, next) => {
  console.log("firebaseBucket.storage", firebaseBucket)
  if (!req.file) {
    return next();
  }

  const image = req.file;
  const fileName = Date.now() + "." + image.originalname.split(".").pop();
  const file = firebaseBucket.file(fileName);
  const stream = file.createWriteStream({
    metaData: {
      contentType: image.mimeType,
    },
  });

  stream.on("error", (e) => {
    console.log(e);
  });

  stream.on("finish", async () => {
    try {
      await file.makePublic();
      req.file.firebaseUrl = `${firebaseBucket.storage.apiEndpoint}/${firebaseBucket.name}/${fileName}`;
      next();
    } catch (err) {
      console.log(err);
    }
  });

  stream.end(image.buffer);
};

// Multer Setup
const multer = require("multer");
const FirebaseMulter = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
});

module.exports = {
  FirebaseMulter,
  uploadSingleFileOnFirebase,
  uploadMultipleFileOnFirebase,
};
