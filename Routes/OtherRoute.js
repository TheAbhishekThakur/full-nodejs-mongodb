const express = require('express');
const router = express.Router();
const { sendResponse, sendErrorResponse } = require("../Utils/reqResFormat");
const auth = require("../Middleware/authUser");
const ProperValidateController = require("../Controllers/ProperValidateController");

// Cache
const NodeCache = require("node-cache");
const myCache = new NodeCache();

// Token
var jwt = require('jsonwebtoken');

// convert-excel-to-json
const excelToJson = require('convert-excel-to-json');


// Cache on server
router.get('/set-get-in-cache', (req, res, next) => {
    try {

        let obj = {
            name: "Abhishek Thakur",
            age: 25
        }
        // Set single obj
        myCache.set("myKey", obj, 10000);
        let value = myCache.get("myKey");

        // check data exist or not in cache
        let check = myCache.has("myKey");
        console.log("check", check)

        // Set multiple obj
        const object1 = { my: "Special", variable: 42 };
        const object2 = { my: "other special", variable: 1337 };

        const success = myCache.mset([
            { key: "cacheKey1", val: object1, ttl: 10000 },
            { key: "cacheKey2", val: object2 },
        ]);

        let value2 = myCache.mget(["cacheKey1", "cacheKey2"]);

        // Delete single and multiple
        let deleteSingle = myCache.del("myKey");
        let deleteMultiple = myCache.del(["cacheKey1", "cacheKey2"]);

        let data = {
            singleValue: value,
            multipleValue: value2
        }

        if (data) {
            res.status(200).send(sendResponse(data, 0, 'cache_data'));
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
});


// Generate Token
router.get('/generate-token', async (req, res, next) => {
    try {
        let token = jwt.sign({ name: 'Abhishek Thakur', age: 25 }, 'abhishek-thakur-token', { expiresIn: 60 * 60 });
        res.status(200).send(sendResponse({ token: token }, 0, 'token-data'));
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
});


// Verify Token
router.get('/verify-token', auth, async (req, res, next) => {
    let data = req.user;
    res.status(200).send(sendResponse({ tokenSavedData: data }, 0, 'token-verified'));

    // try {
    //     // let data = req.user
    //     res.status(200).send(sendResponse("data", 0, 'token-verified'));
    // } catch (error) {
    //     console.log("error", error);
    //     res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    // }
});



// Validate Schema and req
router.post('/proper-validate', ProperValidateController.validateFields)

// Convert XLSL file to JSON
router.post('/convert-exls-to-json', (req, res, next) => {
    try{
        console.log("req",req.file)
        // const result = excelToJson({
        //     sourceFile: 'SOME-EXCEL-FILE.xlsx'
        // });
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
    }catch(err){
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
          });
    }    
})

module.exports = router;