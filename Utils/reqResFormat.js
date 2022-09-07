const sendResponse = (responseData = {}, statusCode = 0, message = '') => {
    return {
        "responseStatus": {
            "statusCode": statusCode,
            "message": message
        },
        "responseData": responseData
    };
}

const sendErrorResponse = (error = {}, statusCode = 1, message) => {
    if (error) {
        const errorObject = {
            "responseStatus": {
                "message": error.message,
                "errorTypeCode": statusCode,
                "errorType": error.type
            }
        }
        return errorObject
    }
    else {
        const errorObject = {
            "responseStatus": {
                "statusCode": statusCode,
                "message": message || "",
                "errorTypeCode": "",
                "errorType": 'Validation error'
            }
        }
        return errorObject
    }
}

module.exports = {
    sendErrorResponse,
    sendResponse
}