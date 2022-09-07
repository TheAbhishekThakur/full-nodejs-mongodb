const jwt = require('jsonwebtoken');
const  jwtPrivateKey  = "abhishek-thakur-token";
// const User = require('../Models/UserModel');

// const auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer', '');
//         const decode = jwt.verify(token.trim(),jwtPrivateKey);
//         const user = await User.findOne({ _id: decode._id });
//         if (!user) {
//             throw new Error('Error')
//         }
//         req.user = user;
//         // req.token = token;
//         next();

//     } catch (e) {
//         res.status(401).send({ status: 'Token did not match' });
//     }
// }

const auth = async (req, res, next) => {
    console.log("Called")
    try {
        const token = req.header('Authorization').replace('Bearer', '');
        const decode = jwt.verify(token.trim(),jwtPrivateKey);
        const user = decode
        if (!user) {
            throw new Error('Error')
        }
        req.user = user;
        // req.token = token;
        next();

    } catch (e) {
        res.status(401).send({ status: 'Token did not match' });
    }
}

module.exports = auth;