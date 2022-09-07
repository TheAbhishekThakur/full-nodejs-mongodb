const express = require('express');
const router = express.Router();
const UserController = require("../Controllers/UserController");
// const auth = require('../Middleware/authUser');

//Insert
router.post('/create-user', UserController.createUser);
router.post('/insert-many-doc', UserController.insertManyDoc);

//Update
router.post('/update-one-doc', UserController.updateOneDocument);
router.post('/update-many-doc', UserController.updateManyDocument);

//Read
router.get('/get-all-doc', UserController.getAllDocument);
router.get('/get-one-doc', UserController.getOneDocument);
router.get("/get-by-id/:id", UserController.getDataById);

//Delete
router.get('/delete-one-doc',UserController.deleteOneDoc);
router.get('/delete-many-doc',UserController.deleteManyDoc);

//Pagination
router.get('/get-user-list-paginate', UserController.getUserList);

//Save Password in bcrypt from
router.post('/create-user-with-bycrpt-pass', UserController.savePasswordInBcrypt);

//Get and Match Password 
router.post('/match-bycrpt-pass', UserController.matchPassword);




//Mail send
router.post('/send-mail',UserController.sendMail);

router.post('/send-otp', UserController.sendOtp)
router.post('/verify-otp', UserController.verifyOtp)

module.exports = router;