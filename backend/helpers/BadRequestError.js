const HttpError = require('./HttpError')

const BadRequestError = (error) => {
    if(error){
        const errorMessage = error.details
        .map((detail) => detail.message)
        .join(";  ")
        throw HttpError(400, errorMessage)
    }
}

module.exports = BadRequestError