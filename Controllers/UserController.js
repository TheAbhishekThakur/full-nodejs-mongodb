const UserModel = require("../Models/UserModel");
const { sendResponse, sendErrorResponse } = require("../Utils/reqResFormat");
const constant = require("../Utils/Constant")
const { sendEmailToUser } = require("../Utils/sendEmail");

//For bcrypt password
const bcrypt = require("bcrypt");

// Create Client for send and verify otp using 
// const client = require("twilio")(constant.accountSID, constant.authToken);






// create() method is behave like insertOne() method
// Like -> db.UserModel.insertOne({ name: "abhishek thakur"})
// Insert one document
const createUser = async (req, res) => {
    try {
        console.log("req", req.body)
        let obj = req.body;
        let created = await UserModel.create(obj);
        // console.log("created",created)
        if (created) {
            res.status(200).send(sendResponse(created, 0, 'created'));
        }

    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}


// insertMany() method is as it is behave like insertMany() method
// Like -> db.UserModel.insertMany([{name:"journal"},{ name: "mat" }, { name: "mousepad"}])
// Insert multiple document

const insertManyDoc = async (req, res) => {
    try {
        let userArr = req.body.data;
        let created = await UserModel.insertMany(userArr);
        if (created) {
            res.status(200).send(sendResponse(created, 0, 'created'));
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}


// Update one document
// Ex -> const res = await UserModel.updateOne({ _id: "612096f93f688b126c0fd18a" }, { $set: { name: name });

const updateOneDocument = async (req, res) => {
    try {
        let name = req.body.name;
        let updated = await UserModel.updateOne({ _id: "612096f93f688b126c0fd18a" }, { $set: { name: name } });
        if (updated.nModified == 1) {
            res.status(200).send(sendResponse(updated, 0, 'updated'));
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}

// Update multiple document
// Ex -> let updated = await UserModel.updateMany({ isDeleted: isDeleted }, { $set: { name: name } });

const updateManyDocument = async (req, res) => {
    try {
        let isDeleted = req.body.isDeleted;
        let name = "Abhishek Thakur";

        let updated = await UserModel.updateMany({ isDeleted: isDeleted }, { $set: { name: name } });
        console.log("updated", updated)
        if (updated.nModified !== 0) {
            res.status(200).send(sendResponse(updated, 0, 'updated'));
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}

// Get multiple document
// Ex -> let data = await UserModel.find();

const getAllDocument = async (req, res) => {
    try {
        let data = await UserModel.find();
        if (data) {
            res.status(200).send(sendResponse(data, 0, 'success'));
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}

// Get one document
// Ex -> let data = await UserModel.findOne({ email: email });

const getOneDocument = async (req, res) => {
    try {
        let email = req.query.email
        let data = await UserModel.findOne({ email: email });
        if (data) {
            res.status(200).send(sendResponse(data, 0, 'success'));
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}

// Get data by Id
const getDataById = async (req, res) => {
    try {
        let id = req.params.id
        console.log("id", id);

        let data = await UserModel.findById(id);
        if (data) {
            res.status(200).send(sendResponse(data, 0, 'success'));
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}

// Delete one document
const deleteOneDoc = async (req, res) => {
    try {
        let email = req.query.email
        console.log("email", email);

        let data = await UserModel.deleteOne({ email: email });
        if (data.deletedCount == 1) {
            res.status(200).send(sendResponse(data, 0, 'success'));
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}


// Delete multiple document
const deleteManyDoc = async (req, res) => {
    try {
        console.log("req", req.query)
        let name = req.query.name
        let regex = new RegExp(name)
        console.log("name", name);

        let data = await UserModel.deleteMany({ name: regex });
        if (data.deletedCount !== 0) {
            res.status(200).send(sendResponse(data, 0, 'success'));
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}


// Pagination
const getUserList = async (req, res, next) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        console.log("req", page, limit)

        const option = {
            page: page,
            limit: limit
        }

        await UserModel.paginate({}, option, function (err, result) {
            if (err) {
                res.status(500).send(sendErrorResponse(err, 2, 'internal_server_error'))
            }

            if (result) {
                res.status(200).send(sendResponse(result, 0, 'success'));
            }
        })

    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}



//Save Password in bcrypt from
const savePasswordInBcrypt = async (req, res, next) => {
    try {
        let obj = req.body

        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);

        // now we set user password to hashed password
        obj.password = await bcrypt.hash(req.body.password, salt);

        let created = await UserModel.create(obj);
        if (created) {
            res.status(200).send(sendResponse(created, 0, 'success'));
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}



//Get and Match Password 
const matchPassword = async (req, res, next) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            console.log("validPassword",validPassword)
            if (validPassword) {
                res.status(200).send(sendResponse(user, 0, 'success'));
            } else {
                res.status(400).send(sendErrorResponse('error', 2, 'Invalid_password'))
            }
        } else {
            res.status(404).send(sendErrorResponse('error', 2, 'user_not_found'))
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}


// Send mail
const sendMail = (req, res) => {
    try {
        let email = req.body.email;

        sendEmailToUser(email);
        res.status(200).send(sendResponse('', 0, 'success'));

    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}


const sendOtp = async (req, res) => {
    try {
        let number = req.body.mobile;
        let channel = req.body.channel;

        // client
        //     .verify
        //     .services(constant.serviceID)
        //     .verifications
        //     .create({
        //         to: number,
        //         channel: channel
        //     })
        //     .then((data) => {
        //         res.status(200).send(sendResponse(data, 0, 'otp_sent'));
        //     })

        client.messages.create({
            body: 'Hello from Node',
            to: '+919507061639',
            from: '+12345678901'
        }).then(message => {
            console.log(message)
            res.status(200).send(sendResponse(message, 0, 'otp_sent'));
        })
            .catch(error => {
                console.log(error);
                res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
            })

    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}

const verifyOtp = async (req, res) => {
    try {
        let number = req.body.mobile;
        let code = req.body.code

        client
            .verify
            .services(constant.serviceID)
            .verificationChecks
            .create({
                to: number,
                code: code
            })
            .then((data) => {
                res.status(200).send(data)
            })
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}

module.exports = {
    createUser,
    insertManyDoc,

    updateOneDocument,
    updateManyDocument,

    getAllDocument,
    getOneDocument,
    getDataById,

    deleteOneDoc,
    deleteManyDoc,

    getUserList,

    savePasswordInBcrypt,
    matchPassword,

    sendMail,

    sendOtp,
    verifyOtp
}