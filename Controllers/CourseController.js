const CourseModel = require("../Models/CourseModel");
const UserModel = require("../Models/UserModel");
const { sendResponse, sendErrorResponse } = require("../Utils/reqResFormat");

const createUserCourse = async(req, res, next) => {
    try {
        let created = await CourseModel.create(req.body);
        if(created){
            let updated = await UserModel.updateOne({_id : created.userId}, {courseId : created._id});
            if(updated){
                res.status(200).send(sendResponse(created, 0, 'created'));
            } 
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}

//Get relational data through populate
const getUserWithCoursDetails = async(req, res, next) => {
    try{
        let userId = req.query.userId;
       
        //Get selected data 
        const user = await UserModel.findById(userId)
        .select("isEmailVerified name email mobile")
        .populate('courseId')
        
        if(user){
            res.status(200).send(sendResponse(user, 0, 'success'));
        }
    }catch (error) {
        console.log("error", error);
        res.status(500).send(sendErrorResponse(error, 2, 'internal_server_error'))
    }
}

module.exports = {
    createUserCourse,
    getUserWithCoursDetails
}